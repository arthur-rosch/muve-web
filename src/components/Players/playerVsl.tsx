import '@vidstack/react/player/styles/base.css'

import { PlayIcon } from 'lucide-react'
import {
  ProgressBar,
  VideoButtonCtaBelow,
  VideoButtonCtaInside,
  WatchingNow,
} from './components'
import { useAnalytics } from '../../hooks'
import { VideoLayout } from './layouts/videoLayout'
import { SpeakerSimpleSlash } from '@phosphor-icons/react'
import type { PlayerDataVariables, Video } from '../../types'
import { getIPAddress, getGeolocation, getYoutubeVideoId } from '../../utils'

import { useEffect, useMemo, useRef, useState } from 'react'

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
  type MediaProviderAdapter,
  type MediaProviderChangeEvent,
  MediaPlayerInstance,
} from '@vidstack/react'

export function PlayerVsl({ video }: { video: Video }) {
  const player = useRef<MediaPlayerInstance>(null)

  const { currentTime, duration, paused, ended } = useMediaStore(player)
  const { addViewTimestamps, addViewUnique } = useAnalytics()

  const [progress, setProgress] = useState(0)
  const [playEnd, setPlayEnd] = useState<boolean>(false)
  const [transitionDuration, setTransitionDuration] = useState(0)
  const [playStartTime, setPlayStartTime] = useState<number | null>(0)
  const [playerData, setPlayerData] = useState<PlayerDataVariables>()

  const [overlayVisible, setOverlayVisible] = useState(!!video.smartAutoPlay)
  const [smartAutoPlay, setSmartAutoPlay] = useState(false)

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

  async function onCanEnd() {
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

  function onCanPlay(
    detail: MediaCanPlayDetail,
    nativeEvent: MediaCanPlayEvent,
  ) {}

  function handlePlay() {
    const playerRef = player.current
    if (playerRef) {
      playerRef.muted = false
      if (overlayVisible) {
        playerRef.currentTime = 0
      }
      playerRef.play()
      setOverlayVisible(false)
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

        // Só registra a visualização única quando o usuário clicar no play
        if (!smartAutoPlay) {
          await addViewUnique.mutateAsync({
            ...playerData,
            videoId: video.id,
          })
        }
      } catch (error) {
        console.error('Erro ao adicionar visualização única:', error)
      }
    }

    view()
  }, [video.id, smartAutoPlay])

  useEffect(() => {
    if (video) {
      const handlePlay = () => {
        const currentPlayTime = player.current?.currentTime || 0 // Pegue o tempo atual do player
        setPlayStartTime(currentPlayTime)

        // Registra a visualização única aqui, somente após o usuário clicar no play
        if (smartAutoPlay && !overlayVisible) {
          addViewUnique.mutateAsync({
            ...playerData!,
            videoId: video.id,
          })
        }
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
  }, [
    playStartTime,
    addViewTimestamps,
    playerData,
    video,
    smartAutoPlay,
    overlayVisible,
    addViewUnique,
  ])

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

  useEffect(() => {
    if (video.smartAutoPlay) {
      setSmartAutoPlay(true)
      const playerRef = player.current
      if (playerRef) {
        playerRef.muted = true
        playerRef.play()
        setOverlayVisible(true)
      }
    }
  }, [video.smartAutoPlay])

  const handleEnded = async () => {
    // Garante que a requisição será feita apenas se o vídeo terminou, e playEnd ainda não foi setado
    if (ended && playStartTime !== null && playerData && !playEnd) {
      const currentTime = player.current?.currentTime || 0
      const duration = player.current?.duration || currentTime

      try {
        await addViewTimestamps.mutateAsync({
          ...playerData,
          endTimestamp: duration,
          startTimestamp: playStartTime,
          videoId: video.id,
        })
        setPlayEnd(true) // Marca que a requisição foi feita
      } catch (error) {
        console.error('Erro ao adicionar timestamps:', error)
      }
    }
  }

  return (
    <>
      {video && (
        <div className="relative w-full h-screen z-0">
          <MediaPlayer
            ref={player}
            crossorigin
            playsInline
            load="visible"
            aspectRatio={video.format}
            posterLoad="visible"
            onCanPlay={onCanPlay}
            crossOrigin="anonymous"
            controls={false}
            onProviderChange={onProviderChange}
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
                      style={
                        video.color ? { backgroundColor: video.color } : {}
                      }
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
                      style={
                        video.color ? { backgroundColor: video.color } : {}
                      }
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
                size={video.fictitiousProgressHeight}
                transitionDuration={transitionDuration}
                color={video.color ? video.color : 'rgb(59 130 246)'}
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
  )
}
