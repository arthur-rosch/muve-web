import '@vidstack/react/player/styles/base.css'
import { PlayIcon } from 'lucide-react'
import { ProgressBar } from './components'
import { useParams } from 'react-router-dom'
import { VideoLayout } from './layouts/videoLayout'
import { useEffect, useRef, useState } from 'react'
import { useAnalytics, useVideo } from '../../hooks'
import { getYoutubeVideoId, getIPAddress, getGeolocation } from '../../utils'
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
import type { Video } from '../../types'

export function Player() {
  const params = useParams()

  const { getVideoById } = useVideo(params.videoId!)

  const player = useRef<MediaPlayerInstance>(null)
  const { currentTime, duration, paused } = useMediaStore(player)

  const { addViewTimestamps, addViewUnique } = useAnalytics(params.videoId!)

  const hasFetchedData = useRef(false)
  const [progress, setProgress] = useState(0)
  const [video, setVideo] = useState<Video>()
  const [isFetched, setIsFetched] = useState(false)
  const [transitionDuration, setTransitionDuration] = useState(0)
  const [playStartTime, setPlayStartTime] = useState<number | null>(null)
  const [playerData, setPlayerData] = useState<{
    userIp: string
    deviceType: string
    agent: string
    country: string
    region: string
    city: string
  }>()

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

  function onCanPlay(
    detail: MediaCanPlayDetail,
    nativeEvent: MediaCanPlayEvent,
  ) {
    console.log(detail, nativeEvent)
  }

  const fetchVideo = async () => {
    try {
      const { data } = getVideoById
      if (data) {
        setVideo(data)
        setIsFetched(true)
      }
    } catch (error) {
      console.error('Erro ao buscar vídeo:', error)
    }
  }

  useEffect(() => {
    if (!isFetched) {
      fetchVideo()
    }
  }, [getVideoById, isFetched])

  useEffect(() => {
    if (video) {
      const fetchData = async () => {
        const ipAddress = await getIPAddress()
        const geoData = await getGeolocation(ipAddress)

        const data = {
          userIp: ipAddress,
          city: geoData.city,
          region: geoData.region,
          country: geoData.country,
          agent: navigator.userAgent,
          deviceType: /Mobi|Android/i.test(navigator.userAgent)
            ? 'Mobile'
            : 'Desktop',
        }

        setPlayerData(data)

        try {
          await addViewUnique.mutateAsync({
            videoId: video.id,
            userIp: ipAddress,
            city: geoData.city,
            region: geoData.region,
            country: geoData.country,
            agent: navigator.userAgent,
            deviceType: /Mobi|Android/i.test(navigator.userAgent)
              ? 'Mobile'
              : 'Desktop',
          })
        } catch (error) {
          console.error('Erro ao enviar dados de visualização:', error)
        }
      }

      if (!hasFetchedData.current) {
        fetchData()
        hasFetchedData.current = true
      }
    }
  }, [video, addViewUnique])

  useEffect(() => {
    const handlePlay = () => {
      const currentTime = player.current?.currentTime || 0
      setPlayStartTime(currentTime)
      console.log('Play event triggered at:', currentTime)
    }

    const handlePause = async () => {
      if (playStartTime !== null) {
        const currentTime = player.current?.currentTime || 0
        const duration = currentTime - playStartTime
        setPlayDuration(duration)
        console.log('Pause event triggered at:', currentTime)
        console.log('Play duration:', duration)

        try {
          await addViewTimestamps.mutateAsync({
            ...playerData!,
            endTimestamp: duration,
            startTimestamp: playStartTime,
            videoId: '0640bafe-1f85-4ee2-b88f-3b4def75694d',
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
  }, [playStartTime, addViewTimestamps, playerData])

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
          src={{
            src: video.url,
            type: 'video/mp4',
          }}
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
              src={`https://img.youtube.com/vi/${getYoutubeVideoId(
                video.url,
              )}/maxresdefault.jpg`}
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
