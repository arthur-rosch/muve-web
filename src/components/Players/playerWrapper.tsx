import { Player } from './player'
import type { Video } from '../../types'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { PlayerVsl } from './playerVsl'
import host from '../../utils/host'

export function PlayerWrapper() {
  const location = useLocation()
  const [video, setVideo] = useState<Video | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const getVideoIdFromQuery = () => {
    const searchParams = new URLSearchParams(location.search)
    return searchParams.get('videoId')
  }

  const checkUserSubscription = async () => {
    try {
      const response = await axios.get(`${host()}/user/subscription`)
      const signature = response.data.signature

      if (!signature) {
        setErrorMessage('Usuário sem Plano')
        return false
      }

      switch (signature.status) {
        case 'canceled':
          setErrorMessage('Assinatura cancelada.')
          return false
        case 'past_due':
          setErrorMessage('Assinatura com pagamento atrasado.')
          return false
        case 'trialing':
          const trialEndDate = new Date(signature.trial_end_date)
          if (trialEndDate && trialEndDate < new Date()) {
            setErrorMessage('Período de teste expirado.')
            return false
          }
          break
        default:
          if (signature.status !== 'active' && signature.status !== 'trialing') {
            setErrorMessage('Assinatura inválida.')
            return false
          }
      }

      return true
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Erro ao verificar assinatura.'
      console.error(errorMsg)
      setErrorMessage(errorMsg)
      return false
    }
  }

  const fetchVideo = async () => {
    const videoId = getVideoIdFromQuery()
    if (!videoId) {
      setErrorMessage('ID do vídeo não encontrado na URL.')
      setIsLoading(false)
      return
    }

    try {
      const response = await axios.get(`${host()}/video/${videoId}`)
      const video = response.data.video
      if (video) {
        setVideo(video)
      } else {
        setErrorMessage('Vídeo não encontrado ou resposta inválida da API.')
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Erro ao buscar vídeo.'
      console.error(errorMsg)
      setErrorMessage(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const initializePlayer = async () => {
      setIsLoading(true)
      const hasValidSubscription = await checkUserSubscription()
      if (hasValidSubscription) {
        await fetchVideo()
      } else {
        setIsLoading(false)
      }
    }

    initializePlayer()
  }, [location.search])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>
  }

  return video ? (
    video.type === 'Vsl' ? (
      <PlayerVsl video={video} />
    ) : (
      <Player video={video} />
    )
  ) : (
    <div>Vídeo não encontrado</div>
  )
}
