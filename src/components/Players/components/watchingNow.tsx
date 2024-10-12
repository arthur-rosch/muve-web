import type { Video } from '../../../types'

interface WatchingNowProps {
  video: Video
}

export function WatchingNow({ video }: WatchingNowProps) {
  return (
    <div className="w-full z-50">
      <div className="relative w-full h-14">
        <div
          // className={`absolute top-0 left-0 h-full`}
          style={{
            width: `100%`,
            height: `100%`,
            background: `${video.watchingNowBgColor}`,
            color: `${video.watchingNowTextColor}`,
            fontSize: `${video.watchingNowFontSize}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <p>155 pessoas estão assistindo esse video agora...</p>
        </div>
      </div>
    </div>
  )
}
