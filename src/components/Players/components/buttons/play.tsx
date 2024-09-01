import type { MediaButtonProps } from './types'
import * as Tooltip from '@radix-ui/react-tooltip'
import { buttonClass, tooltipClass } from './style'
import { PauseIcon, PlayIcon } from 'lucide-react'
import { PlayButton, useMediaState } from '@vidstack/react'

export function Play({
  tooltipOffset = 0,
  tooltipSide = 'top',
  tooltipAlign = 'center',
}: MediaButtonProps) {
  const isPaused = useMediaState('paused')
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <PlayButton className={buttonClass}>
          {isPaused ? (
            <PlayIcon className="w-7 h-7 translate-x-px" />
          ) : (
            <PauseIcon className="w-7 h-7" />
          )}
        </PlayButton>
      </Tooltip.Trigger>
      <Tooltip.Content
        className={tooltipClass}
        side={tooltipSide}
        align={tooltipAlign}
        sideOffset={tooltipOffset}
      >
        {isPaused ? 'Play' : 'Pause'}
      </Tooltip.Content>
    </Tooltip.Root>
  )
}
