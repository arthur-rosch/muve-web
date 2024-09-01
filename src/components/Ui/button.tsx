import type { FC } from 'react'

interface ButtonProps {
  text: string
  className?: string
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
  type: 'submit' | 'reset' | 'button'
}

export const Button: FC<ButtonProps> = ({
  text,
  type,
  onClick,
  className,
  loading = false,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      className={`w-full p-4 rounded-md text-white flex items-center justify-center ${
        loading
          ? 'bg-blue-500 opacity-80 cursor-not-allowed'
          : 'bg-blue-500 hover:bg-blue-600'
      } ${className}`}
      disabled={loading || disabled}
      onClick={onClick}
    >
      {loading ? (
        <div
          className="w-8 h-8 border-4 border-solid rounded-full animate-spin"
          style={{ borderTopColor: '#217CE5' }}
        ></div>
      ) : (
        text
      )}
    </button>
  )
}
