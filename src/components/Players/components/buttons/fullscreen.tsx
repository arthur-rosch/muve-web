import type { MediaButtonProps } from './types'
import * as Tooltip from '@radix-ui/react-tooltip'
import { buttonClass, tooltipClass } from './style'
import { FullscreenButton, useMediaState } from '@vidstack/react'
import {
  Minimize as FullscreenExitIcon,
  Maximize as FullscreenIcon,
} from 'lucide-react'

export function Fullscreen({
  tooltipOffset = 0,
  tooltipSide = 'top',
  tooltipAlign = 'center',
}: MediaButtonProps) {
  const isActive = useMediaState('fullscreen')
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <FullscreenButton className={buttonClass}>
          {isActive ? (
            <FullscreenExitIcon className="w-7 h-7" />
          ) : (
            <FullscreenIcon className="w-7 h-7" />
          )}
        </FullscreenButton>
      </Tooltip.Trigger>
      <Tooltip.Content
        className={tooltipClass}
        side={tooltipSide}
        align={tooltipAlign}
        sideOffset={tooltipOffset}
      >
        {isActive ? 'Exit Fullscreen' : 'Enter Fullscreen'}
      </Tooltip.Content>
    </Tooltip.Root>
  )
}
