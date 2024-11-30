import type { FC } from 'react'
import { X } from '@phosphor-icons/react'

interface CustomModalTitleProps {
  title: string
  subTitle: string
  setIsOpen: (bool: boolean) => void
}

export const CustomModalTitle: FC<CustomModalTitleProps> = ({
  title,
  subTitle,
  setIsOpen,
}) => {
  return (
    <div className="w-full px-8 py-7 flex items-center justify-between border-b-[1px] border-solid border-[#333333]">
      <div className="w-full flex flex-col items-start justify-start">
        <span className="text-white text-xl">{title}</span>
        <span className="text-[#C8C8C8] text-sm">{subTitle}</span>
      </div>
      <button
        onClick={() => setIsOpen(false)}
        className="text-white hover:text-[#187BF0] transactions-all duration-150"
      >
        <X size={20} />
      </button>
    </div>
  )
}
