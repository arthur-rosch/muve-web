import '@vidstack/react/player/styles/base.css'

import { ContinueWatching, WatchingNow } from './components'
import { useAnalytics } from '../../hooks'
import { VideoLayout } from './layouts/videoLayout'
import type { PlayerDataVariables, Video } from '../../types'
import { getIPAddress, getGeolocation, getYoutubeVideoId } from '../../utils'

import { useEffect, useMemo, useRef, useState } from 'react'

import {
  Poster,
  MediaPlayer,
  isHLSProvider,
  MediaProvider,
  isYouTubeProvider,
  type MediaCanPlayEvent,
  type MediaCanPlayDetail,
  type MediaPlayerInstance,
  type MediaProviderAdapter,
  type MediaProviderChangeEvent,
} from '@vidstack/react'

const setVideoTimeCookie = (videoId: string, time: number) => {
  document.cookie = `video-${videoId}-time=${time}; path=/;`
}

const getVideoTimeFromCookie = (videoId: string): number | null => {
  const match = document.cookie.match(
    new RegExp(`(^| )video-${videoId}-time=([^;]+)`),
  )
  return match ? Number(match[2]) : null
}

export function Player({ video }: { video: Video }) {
  const player = useRef<MediaPlayerInstance>(null)

  const { addViewTimestamps, addViewUnique } = useAnalytics()

  const [showResumeMenu, setShowResumeMenu] = useState(false)
  const [lastTime, setLastTime] = useState<number | null>(null)
  const [playStartTime, setPlayStartTime] = useState<number | null>(0)
  const [playerData, setPlayerData] = useState<PlayerDataVariables>()

  const urlVideo = useMemo(() => {
    if (isYouTubeProvider(video.url)) {
      const videoId = getYoutubeVideoId(video.url)
      return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=0&controls=0&disablekb=1&playsinline=1&cc_load_policy=0&showinfo=0&modestbranding=0&rel=0&loop=0&enablejsapi=1`
    }
    return video.url
  }, [video.url])

  function onProviderChange(
    provider: MediaProviderAdapter | null,
    nativeEvent: MediaProviderChangeEvent,
  ) {
    if (provider) {
      if (isYouTubeProvider(provider)) {
        provider.cookies = true
      }
      if (isHLSProvider(provider)) {
        provider.library =
          'https://cdn.jsdelivr.net/npm/hls.js@^1.0.0/dist/hls.min.js'
        provider.config = {}
      }
    }
  }

  function onCanPlay(
    detail: MediaCanPlayDetail,
    nativeEvent: MediaCanPlayEvent,
  ) {}

  function onPause() {
    const playerRef = player.current
    if (playerRef) {
      const currentTime = playerRef.currentTime
      setVideoTimeCookie(video.id, currentTime)
    }
  }

  function handleResume() {
    const playerRef = player.current
    if (playerRef && lastTime) {
      playerRef.currentTime = lastTime
      playerRef.play()
      setShowResumeMenu(false)
    }
  }

  function handleRestart() {
    const playerRef = player.current
    if (playerRef) {
      playerRef.currentTime = 0
      playerRef.play()
      setShowResumeMenu(false)
    }
  }

  useEffect(() => {
    const view = async () => {
      try {
        const ipAddress = await getIPAddress()
        const geoData = await getGeolocation(ipAddress)

        const playerData = {
          ...geoData,
          userIp: ipAddress,
          agent: navigator.userAgent,
          deviceType: /Mobi|Android/i.test(navigator.userAgent)
            ? 'Mobile'
            : 'Desktop',
        }

        setPlayerData(playerData)

        await addViewUnique.mutateAsync({
          ...playerData,
          videoId: video.id,
        })
      } catch (error) {
        console.error('Erro ao adicionar visualização única:', error)
      }
    }

    view()
  }, [video.id])

  useEffect(() => {
    if (video) {
      const handlePlay = () => {
        const currentPlayTime = player.current?.currentTime || 0 // Pegue o tempo atual do player
        setPlayStartTime(currentPlayTime)
      }

      const handlePause = async () => {
        const currentPauseTime = player.current?.currentTime || 0 // Pegue o tempo atual do player
        if (playStartTime !== null) {
          try {
            await addViewTimestamps.mutateAsync({
              ...playerData!,
              endTimestamp: currentPauseTime,
              startTimestamp: playStartTime,
              videoId: video.id,
            })
          } catch (error) {
            console.error('Erro ao adicionar timestamps:', error)
          }
        }
      }

      const playerInstance = player.current
      if (playerInstance) {
        playerInstance.addEventListener('play', handlePlay)
        playerInstance.addEventListener('pause', handlePause)

        return () => {
          playerInstance.removeEventListener('play', handlePlay)
          playerInstance.removeEventListener('pause', handlePause)
        }
      }
    }
  }, [playStartTime, addViewTimestamps, playerData, video])

  useEffect(() => {
    const savedTime = getVideoTimeFromCookie(video.id)
    if (savedTime) {
      setLastTime(savedTime)
      setShowResumeMenu(true)
    }
  }, [video.id])
  return (
    <>
      {video && (
        <div className="relative w-full h-full z-0">
          <MediaPlayer
            crossorigin
            playsInline
            ref={player}
            load="visible"
            src={urlVideo}
            onPause={onPause}
            posterLoad="visible"
            onCanPlay={onCanPlay}
            controls={false}
            crossOrigin="anonymous"
            aspectRatio={video.format}
            onProviderChange={onProviderChange}
            className="w-full h-[95%] relative text-white bg-transparent font-sans overflow-hidden rounded-md ring-media-focus data-[focus]:ring-4"
          >
            <MediaProvider>
              <Poster
                alt="Poster image"
                className="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 object-cover"
              />
            </MediaProvider>

            {showResumeMenu && (
              <ContinueWatching
                handleRestart={handleRestart}
                handleResume={handleResume}
              />
            )}

            <VideoLayout video={video} chapters={video.Chapter} />
          </MediaPlayer>
          {video.watchingNow && <WatchingNow video={video} />}
        </div>
      )}
    </>
  )
}
