import { motion, type Variants } from 'framer-motion'
import type { FC, ReactNode } from 'react'

interface ButtonProps {
  text?: string
  loading?: boolean
  className?: string
  disabled?: boolean
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline' | 'link' | 'danger'
  type: 'submit' | 'reset' | 'button'
  children?: ReactNode
  animation?: boolean
  variants?: Variants
}

export const Button: FC<ButtonProps> = ({
  text,
  type,
  variants,
  animation = false,
  onClick,
  className = '',
  loading = false,
  disabled = false,
  variant = 'primary',
  children,
}) => {
  const variantClasses = {
    primary:
      'rounded-lg bg-[#187BF0] text-white cursor-pointer hover:brightness-75 transition-brightness duration-300',
    secondary:
      'rounded-lg bg-transparent text-[#187BF0] border-[1px] border-solid border-[#187BF0] hover:border-[#187BF0] hover:text-[#187BF0] hover:bg-[#187BF014] transition-colors duration-300',
    outline:
      'rounded-lg bg-transparent text-[#333333] border-[1px] border-solid border-[#333333] hover:border-[#187BF0] hover:text-[#187BF0] transition-colors duration-300',
    link: 'text-[#909090] rounded-lg cursor-pointer hover:bg-[#333333] hover:text-white transition-colors duration-300',
    danger:
      'rounded-lg bg-[#333333] text-white cursor-pointer hover:brightness-75 transition-brightness duration-300',
  }

  const buttonClasses = `${variantClasses[variant]} ${className}`

  return (
    <>
      {animation ? (
        <motion.button
          type={type}
          onClick={onClick}
          variants={variants}
          className={buttonClasses}
          disabled={loading || disabled}
        >
          {loading ? (
            <div
              className="w-8 h-8 border-4 border-solid rounded-full animate-spin"
              style={{ borderTopColor: '#217CE5' }}
            ></div>
          ) : (
            <>
              {text}
              {children}
            </>
          )}
        </motion.button>
      ) : (
        <button
          type={type}
          className={buttonClasses}
          disabled={loading || disabled}
          onClick={onClick}
        >
          {loading ? (
            <div
              className="w-8 h-8 border-4 border-solid rounded-full animate-spin"
              style={{ borderTopColor: '#217CE5' }}
            ></div>
          ) : (
            <>
              {text}
              {children}
            </>
          )}
        </button>
      )}
    </>
  )
}
