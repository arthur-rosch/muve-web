import { useCallback, useRef } from "react";
import { useAnalytics } from "./useAnalytics";
import type { PlayerDataVariables } from "../types";
import { getIPAddress, getGeolocation } from "../utils";

export function useVideoAnalytics(videoId: string) {
  const { addViewTimestamps, addViewUnique } = useAnalytics();
  const hasRecordedUniqueView = useRef(false);
  const lastRecordedTimestamp = useRef<number | null>(null);

  const initializePlayerData = useCallback(async () => {
    try {
      const ipAddress = await getIPAddress();
      const geoData = await getGeolocation(ipAddress);

      return {
        ...geoData,
        userIp: ipAddress,
        agent: navigator.userAgent,
        deviceType: /Mobi|Android/i.test(navigator.userAgent)
          ? "Mobile"
          : "Desktop",
      };
    } catch (error) {
      console.error("Error initializing player data:", error);
      return null;
    }
  }, []);

  const recordViewTimestamp = useCallback(
    async (
      playerData: PlayerDataVariables,
      startTimestamp: number,
      endTimestamp: number
    ) => {
      try {
        // Evita registros muito próximos (menos de 1 segundo de diferença)
        if (
          lastRecordedTimestamp.current &&
          endTimestamp - lastRecordedTimestamp.current < 1
        ) {
          return;
        }

        await addViewTimestamps.mutateAsync({
          ...playerData,
          startTimestamp,
          endTimestamp,
          videoId,
        });

        lastRecordedTimestamp.current = endTimestamp;
      } catch (error) {
        console.error("Error recording view timestamp:", error);
      }
    },
    [addViewTimestamps, videoId]
  );

  const recordUniqueView = useCallback(
    async (playerData: PlayerDataVariables) => {
      try {
        // Garante que a visualização única só seja registrada uma vez
        if (hasRecordedUniqueView.current) {
          return;
        }

        await addViewUnique.mutateAsync({
          ...playerData,
          videoId,
        });

        hasRecordedUniqueView.current = true;
      } catch (error) {
        console.error("Error recording unique view:", error);
      }
    },
    [addViewUnique, videoId]
  );

  const resetAnalytics = useCallback(() => {
    hasRecordedUniqueView.current = false;
    lastRecordedTimestamp.current = null;
  }, []);

  return {
    initializePlayerData,
    recordViewTimestamp,
    recordUniqueView,
    resetAnalytics,
  };
}
