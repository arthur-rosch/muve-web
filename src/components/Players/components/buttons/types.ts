import * as Tooltip from '@radix-ui/react-tooltip'

export interface MediaButtonProps {
  tooltipSide?: Tooltip.TooltipContentProps['side']
  tooltipAlign?: Tooltip.TooltipContentProps['align']
  tooltipOffset?: number
}
