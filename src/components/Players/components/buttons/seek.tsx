import { SeekButton } from '@vidstack/react'
import { SeekForward10Icon } from '@vidstack/react/icons'

export const Seek = () => {
  return (
    <SeekButton
      className="ring-sky-400 relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4 aria-hidden:hidden"
      seconds={10}
    >
      <SeekForward10Icon className="w-8 h-8" />
    </SeekButton>
  )
}
