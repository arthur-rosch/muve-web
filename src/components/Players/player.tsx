import '@vidstack/react/player/styles/base.css'

import { PlayIcon } from 'lucide-react'
import { ProgressBar } from './components'
import { useAnalytics } from '../../hooks'
import { VideoLayout } from './layouts/videoLayout'
import type { PlayerDataVariables, Video } from '../../types'
import { getYoutubeVideoId, getIPAddress, getGeolocation } from '../../utils'

import { useEffect, useRef, useState } from 'react'

import {
  Poster,
  PlayButton,
  MediaPlayer,
  isHLSProvider,
  MediaProvider,
  useMediaStore,
  isYouTubeProvider,
  type MediaCanPlayEvent,
  type MediaCanPlayDetail,
  type MediaPlayerInstance,
  type MediaProviderAdapter,
  type MediaProviderChangeEvent,
} from '@vidstack/react'

export function Player({ video }: { video: Video }) {
  const player = useRef<MediaPlayerInstance>(null)

  const { currentTime, duration, paused } = useMediaStore(player)
  const { addViewTimestamps, addViewUnique } = useAnalytics()

  const [progress, setProgress] = useState(0)
  const [transitionDuration, setTransitionDuration] = useState(0)
  const [playStartTime, setPlayStartTime] = useState<number | null>(null)
  const [playerData, setPlayerData] = useState<PlayerDataVariables>()

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
  ) {
    console.log(detail, nativeEvent)
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
        setPlayStartTime(currentTime)
        console.log('Play event triggered at:', currentTime)
      }

      const handlePause = async () => {
        if (playStartTime) {
          try {
            await addViewTimestamps.mutateAsync({
              ...playerData!,
              endTimestamp: currentTime,
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
  }, [playStartTime, addViewTimestamps, playerData, video, currentTime])

  useEffect(() => {
    if (video && !paused) {
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
  }, [currentTime, duration, paused, video])

  return (
    <>
      {video && (
        <MediaPlayer
          crossorigin
          playsInline
          ref={player}
          load="visible"
          src={video.url}
          posterLoad="visible"
          onCanPlay={onCanPlay}
          crossOrigin="anonymous"
          aspectRatio={video.format}
          onProviderChange={onProviderChange}
          className="w-full h-full relative text-white bg-transparent font-sans overflow-hidden rounded-md ring-media-focus data-[focus]:ring-4"
        >
          <MediaProvider>
            <Poster
              alt="Poster image"
              // src={`https://img.youtube.com/vi/${getYoutubeVideoId(
              //   video.url,
              // )}/maxresdefault.jpg`}
              className="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 object-cover"
            />
          </MediaProvider>

          {video.type === 'Vsl' && video.fictitiousProgress && paused && (
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

          {video.type === 'Vsl' && video.fictitiousProgress && (
            <ProgressBar
              progress={progress}
              transitionDuration={transitionDuration}
              color={video.color ? video.color : 'rgb(59 130 246)'}
            />
          )}

          <VideoLayout type={video.type} />
        </MediaPlayer>
      )}
    </>
  )
}
