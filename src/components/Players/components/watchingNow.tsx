import { useState, useEffect } from 'react'
import type { Video } from '../../../types'

interface WatchingNowProps {
  video: Video
}

export function WatchingNow({ video }: WatchingNowProps) {
  const [viewers, setViewers] = useState<number>(0)

  useEffect(() => {
    const updateViewers = () => {
      const randomViewers = Math.floor(Math.random() * (200 - 100 + 1)) + 100
      setViewers(randomViewers)
    }
    
    updateViewers()
    
    const intervalId = setInterval(updateViewers, Math.floor(Math.random() * (4000 - 3000 + 1)) + 3000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="w-full z-50 ">
      <div className="relative w-full h-14">
        <div
          style={{
            width: '100%',
            height: '100%',
            background: `${video.watchingNowBgColor}`,
            color: `${video.watchingNowTextColor}`,
            fontSize: `${video.watchingNowFontSize}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <p>{viewers} pessoas estão assistindo esse vídeo agora...</p>
        </div>
      </div>
    </div>
  )
}
