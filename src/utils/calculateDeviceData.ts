import type { ViewUnique, ViewTimestamp } from "@/types";

export const calculateDeviceMetrics = (
  viewUnique: ViewUnique[],
  viewTimestamps: ViewTimestamp[]
) => {
  const totalViewsByDevice: { [device: string]: number } = {};
  const totalPlaysByDevice: { [device: string]: number } = {};

  viewUnique.forEach((view) => {
    const device = view.deviceType || "Unknown";
    totalViewsByDevice[device] = (totalViewsByDevice[device] || 0) + 1;
  });

  viewTimestamps.forEach((view) => {
    const device = view.deviceType || "Unknown";
    totalPlaysByDevice[device] = (totalPlaysByDevice[device] || 0) + 1;
  });

  return { totalViewsByDevice, totalPlaysByDevice };
};

export const calculateDeviceRetentionData = (
  viewTimestamps: ViewTimestamp[],
  totalDuration: number
) => {
  const retentionData: { [device: string]: number[] } = {};
  let maxEndTime = 0;

  const filteredViews = viewTimestamps.filter(
    (view) => Math.floor(view.startTimestamp) === 0
  );

  filteredViews.forEach((view, index) => {
    const device = view.deviceType || "Unknown";
    let end = Math.min(Math.floor(view.endTimestamp), totalDuration);

    for (let i = index + 1; i < filteredViews.length; i++) {
      if (Math.floor(filteredViews[i].startTimestamp) === end) {
        end = Math.min(
          Math.floor(filteredViews[i].endTimestamp),
          totalDuration
        );
        break;
      }
    }

    if (!retentionData[device]) {
      retentionData[device] = Array(totalDuration + 1).fill(0);
    }

    if (end > maxEndTime) {
      maxEndTime = end;
    }

    for (let i = 0; i <= end; i++) {
      retentionData[device][i]++;
    }
  });

  return { retentionData, maxEndTime, filteredViews };
};
