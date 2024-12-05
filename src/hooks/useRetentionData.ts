import { useState, useEffect } from "react";
import type { ChartProps, RetentionMetrics } from "@/types";
import {
  calculateRetentionData,
  calculateRetentionPercentages,
  formatTime,
  getRetentionStatus,
  convertDurationToSeconds,
} from "@/utils";

export function useRetentionData({ analytics, selectedVideo }: ChartProps) {
  const [chartData, setChartData] = useState<
    { date: string; Retenção: number }[]
  >([]);
  const [retentionMetrics, setRetentionMetrics] = useState<RetentionMetrics[]>(
    []
  );

  useEffect(() => {
    const interval = 10;
    const totalDuration = convertDurationToSeconds(selectedVideo.duration);
    const numIntervals = Math.ceil(totalDuration / interval);

    const { retentionArray, filteredViews, totalFilteredViews } =
      calculateRetentionData(analytics, totalDuration, interval);

    // Calculate retention percentages for chart
    const retentionPercentages = calculateRetentionPercentages(
      retentionArray,
      totalFilteredViews
    );
    setChartData(retentionPercentages);

    // Calculate metrics for intervals
    const metrics = Array(numIntervals)
      .fill(0)
      .map((_, index) => {
        const startSeconds = index * interval;
        const endSeconds = Math.min((index + 1) * interval, totalDuration);

        const playsInInterval = filteredViews.filter(
          (play) =>
            play.startTimestamp <= endSeconds &&
            play.endTimestamp >= startSeconds
        ).length;

        const percentage = (playsInInterval / filteredViews.length) * 100;

        return {
          views: playsInInterval,
          startTime: formatTime(startSeconds),
          endTime: formatTime(endSeconds),
          status: getRetentionStatus(percentage),
          percentage,
        };
      });

    setRetentionMetrics(metrics);
  }, [analytics, selectedVideo]);

  return { chartData, retentionMetrics };
}
