/* eslint-disable @typescript-eslint/no-explicit-any */
import { X } from '@phosphor-icons/react'
import type { FC } from 'react'

interface CustomModalTitleProps {
  title?: string
  children?: any
  setIsOpen: (bool: boolean) => void
}

export const CustomModalTitle: FC<CustomModalTitleProps> = ({
  title,
  children,
  setIsOpen,
}) => {
  return (
    <>
      <div className="w-full flex justify-end h-5">
        <button onClick={() => setIsOpen(false)} className="m-3">
          <X size={28} color="white" />
        </button>
      </div>
      {children && children}
      {title && <h1 className="font-bold text-white text-lg">{title}</h1>}
    </>
  )
}
