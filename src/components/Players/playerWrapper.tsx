import { Player } from './player'
import type { Video } from '../../types'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

export function PlayerWrapper() {
  const params = useParams()
  const [video, setVideo] = useState<Video | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchVideo = async () => {
    try {
      if (params.videoId) {
        const response = await axios.get(
          `http://localhost:3333/api/video/${params.videoId}`,
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
  }, [params.videoId])

  if (isLoading) {
    return <div>Loading...</div> // Loading indicator or placeholder
  }

  return video ? <Player video={video} /> : <div>Video not found</div>
}
