import { type FC, type ChangeEvent } from 'react'
import { motion, type Variants } from 'framer-motion'

interface InputProps {
  type?: string
  value?: string
  className?: string
  placeholder?: string
  id?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  animation?: boolean
  variants?: Variants
  disabled?: boolean
}

export const Input: FC<InputProps> = ({
  id,
  value,
  onChange,
  placeholder,
  type = 'text',
  className,
  animation = false,
  variants,
  disabled = false,
}) => {
  const inputClassName = `bg-[#141414] border-[1px] border-[#333333] border-solid bg-opacity-50 rounded text-white hover:border-[#187BF0] ${className}`

  const InputComponent = (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      className={inputClassName}
    />
  )

  return animation ? (
    <motion.input
      initial="hidden"
      animate="visible"
      disabled={disabled}
      variants={variants}
      className={inputClassName}
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  ) : (
    InputComponent
  )
}
