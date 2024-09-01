import type { FC, ChangeEvent } from 'react'

interface InputProps {
  type?: string
  value?: string
  className?: string
  placeholder?: string
  id?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input: FC<InputProps> = ({
  id,
  value,
  onChange,
  placeholder,
  type = 'text',
  className = '',
}) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full h-14 bg-[#1d1f21] text-white border border-gray-600 rounded-md p-2 focus:border-[#217CE5] focus:outline-none ${className}`}
    />
  )
}
