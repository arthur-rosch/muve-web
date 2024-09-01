import { CheckCircle, CircleIcon } from 'lucide-react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

export function Radio({
  children,
  ...props
}: DropdownMenu.DropdownMenuRadioItemProps) {
  return (
    <DropdownMenu.RadioItem
      className="ring-media-focus group relative flex w-full cursor-pointer select-none items-center justify-start rounded-sm p-2.5 outline-none hocus:bg-white/10 data-[focus]:ring-[3px] text-sm"
      {...props}
    >
      <CircleIcon className="h-4 w-4 text-white group-data-[state=checked]:hidden" />
      <CheckCircle className="text-media-brand hidden h-4 w-4 group-data-[state=checked]:block" />
      <span className="ml-2">{children}</span>
    </DropdownMenu.RadioItem>
  )
}
