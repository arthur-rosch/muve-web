import type { FC } from 'react'
import { getYoutubeVideoId } from '../utils/extractIdVideoYoutube'

export const VideoThumbnail: FC<{ url: string }> = ({ url }) => {
  const videoId = getYoutubeVideoId(url)

  return (
    <img
      className="w-full rounded h-[220px]"
      src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
      alt="Thumbnail do vídeo"
    />
  )
}
