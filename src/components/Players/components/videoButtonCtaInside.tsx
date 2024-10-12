import type { FC } from 'react'
import type { VideoButton } from '../../../types'
import { convertDurationToSeconds } from '../../../utils'

interface VideoButtonCtaProps {
  currentTime: number
  overlayVisible: boolean
  Buttons: VideoButton[]
}

export const VideoButtonCtaInside: FC<VideoButtonCtaProps> = ({
  Buttons,
  currentTime,
  overlayVisible,
}) => {
  return (
    <div className="z-10">
      {Buttons &&
        Buttons.map((button, index) => {
          const startTimeInSeconds = convertDurationToSeconds(button.startTime)
          const endTimeInSeconds = convertDurationToSeconds(button.endTime)
          console.log(button.buttonPosition)
          if (
            button.buttonType === 'inside' && // Verifique o tipo de botão
            currentTime >= startTimeInSeconds &&
            currentTime <= endTimeInSeconds &&
            !overlayVisible
          ) {
            // Defina a classe com base na posição do botão
            const buttonPositionClass = {
              'top-left': 'absolute top-4 left-4',
              top: 'absolute top-4 left-1/2 transform -translate-x-1/2',
              'top-right': 'absolute top-4 right-4',
              left: 'absolute top-1/2 left-4 transform -translate-y-1/2',
              center:
                'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
              right: 'absolute top-1/2 right-4 transform -translate-y-1/2',
              'bottom-left': 'absolute bottom-4 left-4',
              bottom: 'absolute bottom-4 left-1/2 transform -translate-x-1/2',
              'bottom-right': 'absolute bottom-4 right-4',
            }[button.buttonPosition || 'bottom'] // Posição padrão se não estiver definida

            return (
              <a
                href={button.buttonLink}
                key={index}
                className={`mx-2 px-4 py-2 rounded-md ${buttonPositionClass}`}
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
