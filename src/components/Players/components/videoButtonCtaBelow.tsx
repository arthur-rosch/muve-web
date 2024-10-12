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
          console.log(
            button.buttonType === 'below' &&
              currentTime >= startTimeInSeconds &&
              currentTime <= endTimeInSeconds &&
              !overlayVisible,
          )
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
                className={`mx-2 px-4 py-2 rounded-md bg-[${button.backgroundColor}] text-[${button.textColor}] hover:bg-[${button.hoverBackgroundColor}] hover:text-[${button.hoverTextColor}]`}
                style={{
                  backgroundColor: button.backgroundColor,
                  color: button.textColor,
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
