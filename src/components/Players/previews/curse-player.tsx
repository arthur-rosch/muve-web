import type { Video } from '../../../types'
import { VideoLayout } from '../layouts/videoLayout'
import { getYoutubeVideoId } from '../../../utils'
import { useEffect, useRef, useMemo, useState } from 'react'
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
  MediaPlayerInstance,
} from '@vidstack/react'
import '@vidstack/react/player/styles/base.css'
import '@vidstack/react/player/styles/default/theme.css'
import '@vidstack/react/player/styles/default/layouts/audio.css'
import '@vidstack/react/player/styles/default/layouts/video.css'
import { ContinueWatching } from '../components'

interface PreviewPlayerProps {
  video: Video
}

// Função para salvar e obter o tempo de reprodução nos cookies
const setVideoTimeCookie = (videoId: string, time: number) => {
  document.cookie = `video-${videoId}-time=${time}; path=/;`
}

const getVideoTimeFromCookie = (videoId: string): number | null => {
  const match = document.cookie.match(
    new RegExp(`(^| )video-${videoId}-time=([^;]+)`),
  )
  return match ? Number(match[2]) : null
}

export function CursePreviewPlayer({ video }: PreviewPlayerProps) {
  const playerRef = useRef<MediaPlayerInstance>(null)
  const [showResumeMenu, setShowResumeMenu] = useState(false)
  const [lastTime, setLastTime] = useState<number | null>(null)

  const urlVideo = useMemo(() => {
    if (isYouTubeProvider(video.url)) {
      const videoId = getYoutubeVideoId(video.url)
      return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=0&controls=0&disablekb=1&playsinline=1&cc_load_policy=0&showinfo=0&modestbranding=0&rel=0&loop=0&enablejsapi=1`
    }
    return video.url
  }, [video.url])

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

  function onPause() {
    const player = playerRef.current
    if (player) {
      const currentTime = player.currentTime
      setVideoTimeCookie(video.id, currentTime)
    }
  }

  function handleResume() {
    const player = playerRef.current
    if (player && lastTime) {
      player.currentTime = lastTime
      player.play()
      setShowResumeMenu(false)
    }
  }

  function handleRestart() {
    const player = playerRef.current
    if (player) {
      player.currentTime = 0
      player.play()
      setShowResumeMenu(false)
    }
  }

  useEffect(() => {
    const savedTime = getVideoTimeFromCookie(video.id)
    if (savedTime) {
      setLastTime(savedTime)
      setShowResumeMenu(true)
    }
  }, [video.id])

  return (
    <div className="relative w-full h-full z-0">
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
        src={urlVideo}
        onPause={onPause}
        className="w-full h-full relative text-white bg-transparent font-sans overflow-hidden rounded-md ring-media-focus data-[focus]:ring-4"
      >
        <MediaProvider>
          <Poster
            src={video.thumbnail}
            alt="Default Thumbnail"
            className="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 object-cover"
          />
        </MediaProvider>

        <VideoLayout video={video} chapters={video.Chapter} />
      </MediaPlayer>

      {/* {video.watchingNow && <WatchingNow video={video} />} */}

      {video.continueWatching && showResumeMenu && (
        <ContinueWatching
          handleRestart={handleRestart}
          handleResume={handleResume}
        />
      )}
    </div>
  )
}
