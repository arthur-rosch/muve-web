import { PlayIcon } from 'lucide-react'
import type { Video } from '../../../types'
import { ProgressBar } from '../components'
import { useEffect, useRef, useState } from 'react'
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
  const playerRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [transitionDuration, setTransitionDuration] = useState(0)
  const { currentTime, duration, paused } = useMediaStore(playerRef)

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
  ) {}

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

  return (
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
      src={video.url}
      className="w-full h-full relative text-white bg-transparent font-sans overflow-hidden rounded-md ring-media-focus data-[focus]:ring-4"
    >
      <MediaProvider>
        <Poster
          alt="Poster image"
          src={`https://img.youtube.com/vi/${getYoutubeVideoId(video.url)}/maxresdefault.jpg`}
          className="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 object-cover"
        />
      </MediaProvider>

      {paused && (
        <PlayButton>
          <div className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer">
            <div
              className={`flex items-center justify-center play-button bg-opacity-80 w-32 h-32 rounded-full hover:opacity-100 ${!video.color ? 'bg-blue-500' : ''}`}
              style={video.color ? { backgroundColor: video.color } : {}}
            >
              <PlayIcon className="w-12 h-12 translate-x-px" />
            </div>
          </div>
        </PlayButton>
      )}

      <ProgressBar
        progress={progress}
        transitionDuration={transitionDuration}
        color={video.color ? video.color : 'rgb(59 130 246)'}
      />

      <VideoLayout type={video.type} />
    </MediaPlayer>
  )
}
