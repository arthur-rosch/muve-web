import { SubtitlesIcon } from 'lucide-react'
import type { MediaButtonProps } from './types'
import * as Tooltip from '@radix-ui/react-tooltip'
import { buttonClass, tooltipClass } from './style'
import {
  CaptionButton,
  useMediaState,
  isTrackCaptionKind,
} from '@vidstack/react'

export function Caption({
  tooltipOffset = 0,
  tooltipSide = 'top',
  tooltipAlign = 'center',
}: MediaButtonProps) {
  const track = useMediaState('textTrack')
  const isOn = track && isTrackCaptionKind(track)
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <CaptionButton className={buttonClass}>
          <SubtitlesIcon
            className={`w-7 h-7 ${!isOn ? 'text-white/60' : ''}`}
          />
        </CaptionButton>
      </Tooltip.Trigger>
      <Tooltip.Content
        className={tooltipClass}
        side={tooltipSide}
        align={tooltipAlign}
        sideOffset={tooltipOffset}
      >
        {isOn ? 'Closed-Captions Off' : 'Closed-Captions On'}
      </Tooltip.Content>
    </Tooltip.Root>
  )
}
