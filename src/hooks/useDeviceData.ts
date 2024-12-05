import { useState, useEffect } from "react";
import type { ChartProps, DeviceChartData, DeviceMetrics } from "@/types";
import {
  convertDurationToSeconds,
  calculateDeviceMetrics,
  calculateDeviceRetentionData,
} from "@/utils";

export function useDeviceData({ analytics, selectedVideo }: ChartProps) {
  const [chartData, setChartData] = useState<DeviceChartData[]>([]);
  const [deviceMetrics, setDeviceMetrics] = useState<DeviceMetrics[]>([]);
  const [devices, setDevices] = useState<string[]>([]);

  useEffect(() => {
    const totalDuration = convertDurationToSeconds(selectedVideo.duration);
    const { totalViewsByDevice, totalPlaysByDevice } = calculateDeviceMetrics(
      analytics.viewUnique,
      analytics.viewTimestamps
    );

    const { retentionData, maxEndTime, filteredViews } =
      calculateDeviceRetentionData(analytics.viewTimestamps, totalDuration);

    const retentionPercentages: DeviceChartData[] = Array.from(
      { length: maxEndTime + 1 },
      (_, index) => {
        const minutes = Math.floor(index / 60);
        const seconds = index % 60;
        const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        const dataPoint: DeviceChartData = {
          date: formattedTime,
        };

        for (const device in retentionData) {
          dataPoint[device] =
            (retentionData[device][index] / filteredViews.length) * 100;
        }

        return dataPoint;
      }
    );

    const metrics = Object.keys(totalViewsByDevice)
      .map((device) => ({
        device,
        totalViews: totalViewsByDevice[device],
        totalPlays: totalPlaysByDevice[device],
      }))
      .sort((a, b) => b.totalViews - a.totalViews);

    const deviceList = Object.keys(retentionPercentages[0] || {}).filter(
      (key) => key !== "date"
    );

    setChartData(retentionPercentages);
    setDeviceMetrics(metrics);
    setDevices(deviceList);
  }, [analytics, selectedVideo]);

  return { chartData, deviceMetrics, devices };
}
