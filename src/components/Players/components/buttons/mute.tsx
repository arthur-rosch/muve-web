import type { MediaButtonProps } from './types'
import * as Tooltip from '@radix-ui/react-tooltip'
import { buttonClass, tooltipClass } from './style'
import { MuteButton, useMediaState } from '@vidstack/react'
import {
  VolumeX as MuteIcon,
  Volume2 as VolumeHighIcon,
  Volume1 as VolumeLowIcon,
} from 'lucide-react'

export function Mute({
  tooltipOffset = 0,
  tooltipSide = 'top',
  tooltipAlign = 'center',
}: MediaButtonProps) {
  const volume = useMediaState('volume')
  const isMuted = useMediaState('muted')
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <MuteButton className={buttonClass} onMediaMuteRequest={() => {}}>
          {isMuted || volume === 0 ? (
            <MuteIcon className="w-7 h-7" />
          ) : volume < 0.5 ? (
            <VolumeLowIcon className="w-7 h-7" />
          ) : (
            <VolumeHighIcon className="w-7 h-7" />
          )}
        </MuteButton>
      </Tooltip.Trigger>
      <Tooltip.Content
        className={tooltipClass}
        side={tooltipSide}
        align={tooltipAlign}
        sideOffset={tooltipOffset}
      >
        {isMuted ? 'Unmute' : 'Mute'}
      </Tooltip.Content>
    </Tooltip.Root>
  )
}
