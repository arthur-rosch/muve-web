import "@vidstack/react/player/styles/base.css";
import { useEffect, useMemo, useState } from "react";
import { MediaPlayer, MediaProvider, Poster } from "@vidstack/react";
import { VideoLayout } from "./layouts/videoLayout";
import { ContinueWatching } from "./components";
import type { Video } from "../../types";
import { useVideoPlayer } from "../../hooks/useVideoPlayer";
import { configureProvider, getVideoUrl } from "../providers/video-provider";

const setVideoTimeCookie = (videoId: string, time: number) => {
  document.cookie = `video-${videoId}-time=${time}; path=/;`;
};

const getVideoTimeFromCookie = (videoId: string): number | null => {
  const match = document.cookie.match(
    new RegExp(`(^| )video-${videoId}-time=([^;]+)`)
  );
  return match ? Number(match[2]) : null;
};

export function Player({ video }: { video: Video }) {
  const { player, handleEnded } = useVideoPlayer(video.id);
  const [showResumeMenu, setShowResumeMenu] = useState(false);
  const [lastTime, setLastTime] = useState<number | null>(null);

  const urlVideo = useMemo(() => getVideoUrl(video.url), [video.url]);

  function onPause() {
    const playerRef = player.current;
    if (playerRef) {
      setVideoTimeCookie(video.id, playerRef.currentTime);
    }
  }

  function handleResume() {
    const playerRef = player.current;
    if (playerRef && lastTime) {
      playerRef.currentTime = lastTime;
      playerRef.play();
      setShowResumeMenu(false);
    }
  }

  function handleRestart() {
    const playerRef = player.current;
    if (playerRef) {
      playerRef.currentTime = 0;
      playerRef.play();
      setShowResumeMenu(false);
    }
  }

  useEffect(() => {
    const savedTime = getVideoTimeFromCookie(video.id);
    if (savedTime) {
      setLastTime(savedTime);
      setShowResumeMenu(true);
    }
  }, [video.id]);

  return (
    <>
      {video && (
        <div className="relative w-full h-screen z-0">
          <MediaPlayer
            crossorigin
            playsInline
            ref={player}
            load="visible"
            src={urlVideo}
            onPause={onPause}
            posterLoad="visible"
            controls={false}
            crossOrigin="anonymous"
            onEnded={handleEnded}
            aspectRatio={video.format}
            onProviderChange={configureProvider}
            className="w-full h-full relative text-white bg-transparent font-sans overflow-hidden rounded-md ring-media-focus data-[focus]:ring-4"
          >
            <MediaProvider>
              <Poster
                alt="Poster image"
                className="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 object-cover"
              />
            </MediaProvider>

            {video.continueWatching && showResumeMenu && (
              <ContinueWatching
                handleRestart={handleRestart}
                handleResume={handleResume}
              />
            )}

            <VideoLayout video={video} chapters={video.Chapter} />
          </MediaPlayer>
        </div>
      )}
    </>
  );
}
