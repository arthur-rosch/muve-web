import { Player } from './player'
import type { Video } from '../../types'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

export function PlayerWrapper() {
  const location = useLocation()
  const [video, setVideo] = useState<Video | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const getVideoIdFromQuery = () => {
    const searchParams = new URLSearchParams(location.search)
    return searchParams.get('videoId')
  }

  const fetchVideo = async () => {
    const videoId = getVideoIdFromQuery()
    try {
      if (videoId) {
        const response = await axios.get(
          `http://localhost:3333/api/video/${videoId}`,
        )
        const video = response.data.video
        if (video) {
          setVideo(video)
          setIsLoading(false)
        } else {
          console.error('Video not found or API response is invalid')
          setIsLoading(false)
        }
      }
    } catch (error) {
      console.error('Erro ao buscar vídeo:', error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchVideo()
  }, [location.search]) // Re-fetch video when query changes

  if (isLoading) {
    return <div>Loading...</div> // Loading indicator or placeholder
  }

  return video ? <Player video={video} /> : <div>Video not found</div>
}
