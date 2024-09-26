import { useRef } from 'react'
import type { Video } from '../../../types'
import { VideoLayout } from '../layouts/videoLayout'
import {
  Poster,
  MediaPlayer,
  MediaProvider,
  type MediaCanPlayEvent,
  type MediaCanPlayDetail,
  type MediaProviderChangeEvent,
  type MediaProviderAdapter,
  isYouTubeProvider,
  isHLSProvider,
} from '@vidstack/react'
import '@vidstack/react/player/styles/base.css'
import '@vidstack/react/player/styles/default/theme.css'
import '@vidstack/react/player/styles/default/layouts/audio.css'
import '@vidstack/react/player/styles/default/layouts/video.css'

interface PreviewPlayerProps {
  video: Video
}

export function CursePreviewPlayer({ video }: PreviewPlayerProps) {
  const playerRef = useRef(null)

  function onCanPlay(
    detail: MediaCanPlayDetail,
    nativeEvent: MediaCanPlayEvent,
  ) {
    console.log(detail, nativeEvent)
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

  return (
    <MediaPlayer
      crossorigin
      playsInline
      load="visible"
      ref={playerRef}
      aspectRatio={video.format}
      posterLoad="visible"
      onCanPlay={onCanPlay}
      crossOrigin="anonymous"
      onProviderChange={onProviderChange}
      // src={video.url}
      src="https://www.youtube-nocookie.com/embed/LXb3EKWsInQ?autoplay=0&controls=0&disablekb=1&playsinline=1&cc_load_policy=0&showinfo=0&modestbranding=0&rel=0&loop=0&enablejsapi=1"
      className="w-full h-full relative text-white bg-transparent font-sans overflow-hidden rounded-md ring-media-focus data-[focus]:ring-4"
    >
      <MediaProvider>
        <Poster
          alt="Poster image"
          src={video.thumbnail}
          className="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 object-cover"
        />
      </MediaProvider>

      <VideoLayout type={video.type} chapters={video.Chapter} />
    </MediaPlayer>
  )
}
