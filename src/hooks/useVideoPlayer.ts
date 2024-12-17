import { useRef, useEffect, useState, useCallback } from "react";
import type { MediaPlayerInstance } from "@vidstack/react";
import { useVideoAnalytics } from "./useVideoAnalytics";
import type { PlayerDataVariables } from "../types";

export function useVideoPlayer(videoId: string) {
  const player = useRef<MediaPlayerInstance>(null);
  const [playerData, setPlayerData] = useState<PlayerDataVariables>();
  const [playStartTime, setPlayStartTime] = useState<number | null>(0);
  const [playEnd, setPlayEnd] = useState(false);
  const isPlaying = useRef(false);

  const {
    initializePlayerData,
    recordViewTimestamp,
    recordUniqueView,
    resetAnalytics,
  } = useVideoAnalytics(videoId);

  const handlePlay = useCallback(() => {
    if (!isPlaying.current) {
      const currentPlayTime = player.current?.currentTime || 0;
      setPlayStartTime(currentPlayTime);
      isPlaying.current = true;
    }
  }, []);

  const handlePause = useCallback(async () => {
    if (isPlaying.current) {
      const currentPauseTime = player.current?.currentTime || 0;
      if (playStartTime !== null && playerData) {
        await recordViewTimestamp(playerData, playStartTime, currentPauseTime);
      }
      isPlaying.current = false;
    }
  }, [playStartTime, playerData, recordViewTimestamp]);

  const handleEnded = useCallback(async () => {
    if (playStartTime !== null && playerData && !playEnd && isPlaying.current) {
      const currentTime = player.current?.currentTime || 0;
      const duration = player.current?.duration || currentTime;

      await recordViewTimestamp(playerData, playStartTime, duration);
      setPlayEnd(true);
      isPlaying.current = false;
    }
  }, [playStartTime, playerData, playEnd, recordViewTimestamp]);

  useEffect(() => {
    const initAnalytics = async () => {
      const data = await initializePlayerData();
      if (data) {
        setPlayerData(data);
        await recordUniqueView(data);
      }
    };

    initAnalytics();

    return () => {
      resetAnalytics();
    };
  }, [initializePlayerData, recordUniqueView, resetAnalytics]);

  useEffect(() => {
    const playerInstance = player.current;
    if (playerInstance) {
      playerInstance.addEventListener("play", handlePlay);
      playerInstance.addEventListener("pause", handlePause);

      return () => {
        playerInstance.removeEventListener("play", handlePlay);
        playerInstance.removeEventListener("pause", handlePause);
      };
    }
  }, [handlePlay, handlePause]);

  return {
    player,
    playerData,
    handleEnded,
  };
}
