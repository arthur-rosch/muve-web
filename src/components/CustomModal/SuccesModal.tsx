import type { FC } from 'react'
import { CheckCircle } from '@phosphor-icons/react'

interface SuccessModalProps {
  text: string
}

export const SuccessModal: FC<SuccessModalProps> = ({ text }) => {
  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <CheckCircle size={248} color="#187bf0" />
      <span className="text-white text-sm">{text}</span>
    </div>
  )
}
