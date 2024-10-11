import { SpeakerSimpleSlash } from '@phosphor-icons/react'
import { PlayIcon } from 'lucide-react'
import type { Video } from '../../../types'
import { ProgressBar, WatchingNow } from '../components'
import { useEffect, useRef, useState, useMemo } from 'react'
import { VideoLayout } from '../layouts/videoLayout'

import {
  Poster,
  PlayButton,
  MediaPlayer,
  MediaProvider,
  useMediaStore,
  type MediaCanPlayEvent,
  type MediaCanPlayDetail,
  type MediaProviderAdapter,
  type MediaProviderChangeEvent,
  isYouTubeProvider,
  isHLSProvider,
  MediaPlayerInstance,
} from '@vidstack/react'

import '@vidstack/react/player/styles/base.css'
import '@vidstack/react/player/styles/default/theme.css'
import '@vidstack/react/player/styles/default/layouts/audio.css'
import '@vidstack/react/player/styles/default/layouts/video.css'
import { getYoutubeVideoId } from '../../../utils'

interface PreviewPlayerProps {
  video: Video
}

export function VslPreviewPlayer({ video }: PreviewPlayerProps) {
  const playerRef = useRef<MediaPlayerInstance>(null)

  const [progress, setProgress] = useState(0)
  const [transitionDuration, setTransitionDuration] = useState(0)

  const [overlayVisible, setOverlayVisible] = useState(!!video.smartAutoPlay)
  const [smartAutoPlay, setSmartAutoPlay] = useState(false)

  const { currentTime, duration, paused, ended } = useMediaStore(playerRef)

  useEffect(() => {
    if (video.smartAutoPlay) {
      setSmartAutoPlay(true)
      const player = playerRef.current
      if (player) {
        player.muted = true
        player.play()
        player.play()
        setOverlayVisible(true)
      }
    }
  }, [video.smartAutoPlay])

  useEffect(() => {
    if (!paused) {
      if (currentTime <= 1) {
        const newProgress = Math.min((currentTime / 1) * 40, 40)
        setProgress(newProgress)
        setTransitionDuration(300)
      } else if (duration > 1) {
        const remainingTime = duration - 1
        const timeElapsedSinceFastStart = currentTime - 1
        const additionalProgress =
          (timeElapsedSinceFastStart / remainingTime) * 60
        const newProgress = Math.min(40 + additionalProgress, 100)
        setProgress(newProgress)
        setTransitionDuration(1000)
      }
    }
  }, [currentTime, duration, paused])

  function onCanPlay(
    detail: MediaCanPlayDetail,
    nativeEvent: MediaCanPlayEvent,
  ) {
    // Função para lidar com o evento onCanPlay
  }

  function onProviderChange(
    provider: MediaProviderAdapter | null,
    nativeEvent: MediaProviderChangeEvent,
  ) {
    if (provider) {
      if (isYouTubeProvider(provider)) {
        provider.cookies = true
      }
      if (isHLSProvider(provider)) {
        provider.config = {}
      }
    }
  }

  const urlVideo = useMemo(() => {
    if (isYouTubeProvider(video.url)) {
      const videoId = getYoutubeVideoId(video.url)
      return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&controls=0&disablekb=1&playsinline=1&cc_load_policy=0&showinfo=0&modestbranding=0&rel=0&loop=0&enablejsapi=1`
    }
    return video.url
  }, [video.url])

  function handlePlay() {
    const player = playerRef.current
    if (player) {
      player.muted = false
      if (overlayVisible) {
        player.currentTime = 0
      }
      player.play()
      setOverlayVisible(false)
    }
  }

  return (
    <div className="relative w-full h-full z-0">
      <MediaPlayer
        ref={playerRef}
        crossorigin
        playsInline
        load="visible"
        aspectRatio={video.format}
        posterLoad="visible"
        onCanPlay={onCanPlay}
        crossOrigin="anonymous"
        onProviderChange={onProviderChange}
        src={urlVideo}
        muted={overlayVisible}
        autoPlay={video.smartAutoPlay}
        className="w-full h-full relative text-white bg-transparent font-sans overflow-hidden rounded-md ring-media-focus data-[focus]:ring-4"
      >
        <MediaProvider>
          <Poster
            alt="Poster image"
            src={`https://img.youtube.com/vi/${getYoutubeVideoId(video.url)}/maxresdefault.jpg`}
            className="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 object-cover"
          />
        </MediaProvider>

        {paused && !overlayVisible && (
          <div
            className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer"
            onClick={handlePlay}
          >
            {video.ImageVideoPause && video.UrlCoverImageVideoPause ? (
              <div className="relative">
                <img
                  src={video.UrlCoverImageVideoPause}
                  alt=""
                  className="w-full h-auto rounded-md" // Estilos opcionais para a imagem
                />
                <PlayButton
                  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center play-button bg-opacity-80 w-32 h-32 rounded-full hover:opacity-100 ${!video.color ? 'bg-blue-500' : ''}`}
                  style={video.color ? { backgroundColor: video.color } : {}}
                >
                  <PlayIcon className="w-12 h-12 translate-x-px" />
                </PlayButton>
              </div>
            ) : (
              <PlayButton
                className={`flex items-center justify-center play-button bg-opacity-80 w-32 h-32 rounded-full hover:opacity-100 ${!video.color ? 'bg-blue-500' : ''}`}
                style={video.color ? { backgroundColor: video.color } : {}}
              >
                <PlayIcon className="w-12 h-12 translate-x-px" />
              </PlayButton>
            )}
          </div>
        )}

        {ended && !overlayVisible && (
          <div
            className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer"
            onClick={handlePlay}
          >
            {video.ImageOfFinished && video.UrlCoverImageOfFinished ? (
              <div className="relative">
                <img
                  src={video.UrlCoverImageOfFinished}
                  alt=""
                  className="w-full h-auto rounded-md" // Estilos opcionais para a imagem
                />

                <PlayButton
                  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center play-button bg-opacity-80 w-32 h-32 rounded-full hover:opacity-100 ${!video.color ? 'bg-blue-500' : ''}`}
                  style={video.color ? { backgroundColor: video.color } : {}}
                >
                  <PlayIcon className="w-12 h-12 translate-x-px" />
                </PlayButton>
              </div>
            ) : (
              <PlayButton
                className={`flex items-center justify-center play-button bg-opacity-80 w-32 h-32 rounded-full hover:opacity-100 ${!video.color ? 'bg-blue-500' : ''}`}
                style={video.color ? { backgroundColor: video.color } : {}}
              >
                <PlayIcon className="w-12 h-12 translate-x-px" />
              </PlayButton>
            )}
          </div>
        )}

        {smartAutoPlay && overlayVisible && (
          <div className="absolute inset-0 flex  items-center justify-center z-10 bg-black bg-opacity-60">
            <div
              onClick={handlePlay}
              style={
                video.colorSmartPlayers
                  ? { backgroundColor: video.colorSmartPlayers }
                  : {}
              }
              className={`p-4 flex  items-center justify-center bg-[#187BF0] text-white gap-12 rounded`}
            >
              <SpeakerSimpleSlash size={64} />
              <div>
                <p className=" text-lg">{video.TextTopSmartAutoPlay}</p>
                <p className=" text-lg">{video.TextButtonSmartAutoPlay}</p>
              </div>
            </div>
          </div>
        )}

        {video.fictitiousProgress && !overlayVisible && (
          <ProgressBar
            progress={progress}
            transitionDuration={transitionDuration}
            color={video.color ? video.color : 'rgb(59 130 246)'}
          />
        )}

        <VideoLayout video={video} />
      </MediaPlayer>
      {video.watchingNow && <WatchingNow video={video} />}
    </div>
  )
}
