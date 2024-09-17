import { useRef } from 'react'
import type { Video } from '../../../types'
import { getYoutubeVideoId } from '../../../utils'
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
  console.log(video)
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

      <VideoLayout type={video.type} chapters={video.Chapter} />
    </MediaPlayer>
  )
}
