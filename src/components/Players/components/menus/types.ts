import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as Tooltip from '@radix-ui/react-tooltip'

export interface MenuProps {
  side?: DropdownMenu.DropdownMenuContentProps['side']
  align?: DropdownMenu.DropdownMenuContentProps['align']
  offset?: DropdownMenu.DropdownMenuContentProps['sideOffset']
  tooltipSide?: Tooltip.TooltipContentProps['side']
  tooltipAlign?: Tooltip.TooltipContentProps['align']
  tooltipOffset?: number
}
