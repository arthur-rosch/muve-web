import "@vidstack/react/player/styles/base.css";
import type { Video } from "../../types";
import { useVideoPlayer } from "../../hooks";
import { useMediaStore } from "@vidstack/react";
import { VideoLayout } from "./layouts/videoLayout";
import { useEffect, useMemo, useState } from "react";
import { Poster, MediaPlayer, MediaProvider } from "@vidstack/react";
import { configureProvider, getVideoUrl } from "../providers/video-provider";
import {
  ProgressBar,
  WatchingNow,
  PauseOverlay,
  EndedOverlay,
  VideoFormModal,
  VideoButtonCtaBelow,
  VideoButtonCtaInside,
  SmartAutoPlayOverlay,
} from "./components";

export function PlayerVsl({ video }: { video: Video }) {
  const { player, handleEnded } = useVideoPlayer(video.id);
  const { currentTime, duration, paused, ended } = useMediaStore(player);

  const [progress, setProgress] = useState(0);
  const [transitionDuration, setTransitionDuration] = useState(0);
  const [overlayVisible, setOverlayVisible] = useState(!!video.smartAutoPlay);
  const [smartAutoPlay, setSmartAutoPlay] = useState(false);

  const urlVideo = useMemo(() => getVideoUrl(video.url), [video.url]);

  function handlePlay() {
    const playerRef = player.current;
    if (playerRef) {
      playerRef.muted = false;
      if (overlayVisible) {
        playerRef.currentTime = 0;
      }
      playerRef.play();
      setOverlayVisible(false);
    }
  }

  useEffect(() => {
    if (video && !paused) {
      if (currentTime <= 1) {
        const newProgress = Math.min((currentTime / 1) * 40, 40);
        setProgress(newProgress);
        setTransitionDuration(300);
      } else if (duration > 1) {
        const remainingTime = duration - 1;
        const timeElapsedSinceFastStart = currentTime - 1;
        const additionalProgress =
          (timeElapsedSinceFastStart / remainingTime) * 60;
        const newProgress = Math.min(40 + additionalProgress, 100);
        setProgress(newProgress);
        setTransitionDuration(1000);
      }
    }
  }, [currentTime, duration, paused, video]);

  useEffect(() => {
    if (video.smartAutoPlay) {
      setSmartAutoPlay(true);
      const playerRef = player.current;
      if (playerRef) {
        playerRef.muted = true;
        playerRef.play();
        setOverlayVisible(true);
      }
    }
  }, [video.smartAutoPlay]);

  return (
    <>
      {video && (
        <div className="relative w-full h-screen flex flex-col z-0">
          <MediaPlayer
            ref={player}
            crossorigin
            playsInline
            load="visible"
            aspectRatio={video.format}
            posterLoad="visible"
            crossOrigin="anonymous"
            controls={false}
            onProviderChange={configureProvider}
            src={urlVideo}
            onEnded={handleEnded}
            muted={overlayVisible}
            autoPlay={video.smartAutoPlay}
            className="w-full h-full relative text-white bg-transparent font-sans overflow-hidden rounded-md ring-media-focus data-[focus]:ring-4"
          >
            <MediaProvider>
              <Poster
                alt="Poster image"
                className="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 object-cover"
              />
            </MediaProvider>

            {paused && !overlayVisible && (
              <PauseOverlay video={video} onPlay={handlePlay} />
            )}

            {ended && !overlayVisible && (
              <EndedOverlay video={video} onPlay={handlePlay} />
            )}

            {smartAutoPlay && overlayVisible && (
              <SmartAutoPlayOverlay video={video} onPlay={handlePlay} />
            )}

            {video.fictitiousProgress && !overlayVisible && (
              <ProgressBar
                progress={progress}
                size={video.fictitiousProgressHeight}
                transitionDuration={transitionDuration}
                color={video.color ? video.color : "rgb(59 130 246)"}
              />
            )}

            {video.buttonsActive && (
              <VideoButtonCtaInside
                key={video.id}
                Buttons={video.VideoButtons}
                currentTime={currentTime}
                overlayVisible={overlayVisible}
              />
            )}

            <VideoFormModal
              videoForm={video.VideoForm!}
              handleSubmit={() => console.log("Form submitted")}
              handleClose={() => console.log("Form closed")}
            />

            <VideoLayout video={video} chapters={video.Chapter} />
          </MediaPlayer>

          {video.watchingNow && <WatchingNow video={video} />}

          {video.buttonsActive && (
            <VideoButtonCtaBelow
              key={video.id}
              Buttons={video.VideoButtons}
              currentTime={currentTime}
              overlayVisible={overlayVisible}
            />
          )}
        </div>
      )}
    </>
  );
}
