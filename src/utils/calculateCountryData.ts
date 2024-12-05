import type { ViewUnique, ViewTimestamp } from "@/types";

export const calculateCountryMetrics = (
  viewUnique: ViewUnique[],
  viewTimestamps: ViewTimestamp[]
) => {
  const totalViewsByCountry: { [country: string]: number } = {};
  const totalPlaysByCountry: { [country: string]: number } = {};

  viewUnique.forEach((view) => {
    const country = view.country || "Unknown";
    totalViewsByCountry[country] = (totalViewsByCountry[country] || 0) + 1;
  });

  viewTimestamps.forEach((view) => {
    const country = view.country || "Unknown";
    totalPlaysByCountry[country] = (totalPlaysByCountry[country] || 0) + 1;
  });

  return { totalViewsByCountry, totalPlaysByCountry };
};

export const createViewMapByCountry = (viewTimestamps: ViewTimestamp[]) => {
  const viewMapByCountry: {
    [country: string]: Map<number, ViewTimestamp[]>;
  } = {};

  viewTimestamps.forEach((view) => {
    const country = view.country || "Unknown";
    const start = Math.floor(view.startTimestamp);

    if (!viewMapByCountry[country]) {
      viewMapByCountry[country] = new Map<number, ViewTimestamp[]>();
    }

    if (!viewMapByCountry[country].has(start)) {
      viewMapByCountry[country].set(start, []);
    }

    viewMapByCountry[country].get(start)?.push(view);
  });

  return viewMapByCountry;
};

export const countryFindChainedViews = (
  startView: ViewTimestamp,
  viewMap: Map<number, ViewTimestamp[]>,
  totalDuration: number
): number => {
  let endTimestamp = Math.min(
    Math.floor(startView.endTimestamp),
    totalDuration
  );
  let nextViews = viewMap.get(endTimestamp);

  while (nextViews && nextViews.length > 0) {
    const nextView = nextViews.shift();
    if (nextView) {
      endTimestamp = Math.min(Math.floor(nextView.endTimestamp), totalDuration);
      nextViews = viewMap.get(endTimestamp);
    } else {
      break;
    }
  }

  return endTimestamp;
};
