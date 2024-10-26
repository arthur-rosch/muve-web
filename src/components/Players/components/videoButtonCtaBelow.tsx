import type { FC } from 'react'
import type { VideoButton } from '../../../types'
import { convertDurationToSeconds } from '../../../utils'

interface VideoButtonCtaProps {
  currentTime: number
  overlayVisible: boolean
  Buttons: VideoButton[]
}

export const VideoButtonCtaBelow: FC<VideoButtonCtaProps> = ({
  Buttons,
  currentTime,
  overlayVisible,
}) => {
  return (
    <div className="flex justify-center mt-4">
      {Buttons &&
        Buttons.map((button, index) => {
          const startTimeInSeconds = convertDurationToSeconds(button.startTime)
          const endTimeInSeconds = convertDurationToSeconds(button.endTime)

          if (
            button.buttonType === 'below' &&
            currentTime >= startTimeInSeconds &&
            currentTime <= endTimeInSeconds &&
            !overlayVisible
          ) {
            return (
              <a
                href={button.buttonLink}
                key={index}
                className="mx-2 px-4 py-2 rounded-md"
                style={{
                  backgroundColor: button.backgroundColor,
                  color: button.textColor,
                  transition: "background-color 1s, color 1s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = button.hoverBackgroundColor;
                  e.currentTarget.style.color = button.hoverTextColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = button.backgroundColor;
                  e.currentTarget.style.color = button.textColor;
                }}
              >
                {button.buttonText}
              </a>

            )
          }
          return null
        })}
    </div>
  )
}
