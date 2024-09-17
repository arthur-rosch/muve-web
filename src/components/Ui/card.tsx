import type { FC, ReactNode } from 'react'
import { motion, type Variants } from 'framer-motion'

interface CardProps {
  className?: string
  animation?: boolean
  variants?: Variants
  onClick?: () => void
  children?: ReactNode
  variant?: 'primary' | 'secondary'
}

export const Card: FC<CardProps> = ({
  className,
  animation = false,
  variants,
  variant = 'primary',
  onClick,
  children,
}) => {
  const variantClasses = {
    primary:
      'text-white cursor-pointer flex flex-col items-start justify-between bg-transparent border-[1px] border-solid border-[#505050] hover:border-[#187BF0] hover:text-[#187BF0] hover:bg-[#187BF014] transition-colors duration-300',
    secondary:
      'bg-[#1D1D1D] text-white cursor-pointer flex flex-col items-start justify-between border-[1px] border-solid border-[#505050] rounded-lg',
  }

  const classNames = `${variantClasses[variant]} ${className || ''}`

  const Content = (
    <div className={classNames} onClick={onClick}>
      {children}
    </div>
  )

  return animation ? (
    <motion.div
      className={classNames}
      variants={variants}
      initial="hidden"
      animate="visible"
      onClick={onClick}
    >
      {children}
    </motion.div>
  ) : (
    Content
  )
}
