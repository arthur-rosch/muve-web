import { useState, useEffect } from "react";
import type { ChartProps, CountryChartData, CountryMetrics } from "@/types";
import {
  calculateCountryMetrics,
  createViewMapByCountry,
  countryFindChainedViews,
  convertDurationToSeconds,
} from "@/utils";

export function useCountryData({ analytics, selectedVideo }: ChartProps) {
  const [chartData, setChartData] = useState<CountryChartData[]>([]);
  const [countryMetrics, setCountryMetrics] = useState<CountryMetrics[]>([]);
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    const totalDuration = convertDurationToSeconds(selectedVideo.duration);
    const { totalViewsByCountry, totalPlaysByCountry } =
      calculateCountryMetrics(analytics.viewUnique, analytics.viewTimestamps);

    const viewMapByCountry = createViewMapByCountry(analytics.viewTimestamps);
    const retentionDataByCountry: { [country: string]: number[] } = {};
    let maxEndTime = 0;

    Object.keys(viewMapByCountry).forEach((country) => {
      const filteredViews = viewMapByCountry[country].get(0) || [];
      retentionDataByCountry[country] = Array(totalDuration + 1).fill(0);

      filteredViews.forEach((view) => {
        const end = countryFindChainedViews(
          view,
          viewMapByCountry[country],
          totalDuration
        );

        for (let i = 0; i <= end; i++) {
          retentionDataByCountry[country][i]++;
        }

        if (end > maxEndTime) {
          maxEndTime = end;
        }
      });
    });

    const retentionPercentages: CountryChartData[] = Array.from(
      { length: maxEndTime + 1 },
      (_, index) => {
        const minutes = Math.floor(index / 60);
        const seconds = index % 60;
        const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
          seconds
        ).padStart(2, "0")}`;

        const dataPoint: CountryChartData = {
          date: formattedTime,
        };

        for (const country in retentionDataByCountry) {
          const totalFilteredViews =
            (viewMapByCountry[country].get(0) || []).length || 1;
          dataPoint[country] = Math.min(
            100,
            Math.max(
              0,
              (retentionDataByCountry[country][index] / totalFilteredViews) *
                100
            )
          );
        }

        return dataPoint;
      }
    );

    const metrics = Object.keys(totalViewsByCountry)
      .map((country) => ({
        country,
        totalViews: totalViewsByCountry[country],
        totalPlays: totalPlaysByCountry[country],
      }))
      .sort((a, b) => b.totalViews - a.totalViews);

    const countryList = Object.keys(retentionPercentages[0] || {}).filter(
      (key) => key !== "date"
    );

    setChartData(retentionPercentages);
    setCountryMetrics(metrics);
    setCountries(countryList);
  }, [analytics, selectedVideo]);

  return { chartData, countryMetrics, countries };
}
