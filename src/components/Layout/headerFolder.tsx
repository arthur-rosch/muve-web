import type { FC } from 'react'
import AccordionMenuProfile from './AccordionMenuProfile'
import { Bell, FolderOpen, Gear } from '@phosphor-icons/react'

export const HeaderFolder: FC<{ name: string }> = ({ name }) => {
  return (
    <header className="w-full flex items-center justify-between mt-9 px-10 border-b-[1px] border-[#333333] border-solid pb-4">
      <span className="text-[#909090] text-sm font-semibold flex items-center justify-center gap-2">
        <FolderOpen size={18} />
        Pastas /{' '}
        <span className="text-white text-sm font-semibold">{name}</span>
      </span>
      <div className="flex items-center justify-center gap-4">
        <button className="w-7 h-7 flex items-center justify-center bg-[#1D1D1D] rounded-full text-[#777777] hover:text-white transactions-all">
          <Gear size={14} />
        </button>
        <button className="w-7 h-7 flex items-center justify-center bg-[#1D1D1D] rounded-full text-[#777777] hover:text-white transactions-all">
          <Bell size={14} />
        </button>
        <AccordionMenuProfile />
      </div>
    </header>
  )
}
