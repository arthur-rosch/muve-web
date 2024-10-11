import { type FC, type InputHTMLAttributes } from 'react'
import { motion, type Variants } from 'framer-motion'
import InputMask from 'react-input-mask'

// Extende InputHTMLAttributes para incluir todas as props padrão de input
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  animation?: boolean
  variants?: Variants
  isMask?: boolean
  mask?: string
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
  isMask = false,
  mask,
  maxLength,
  ...rest // Captura todas as outras props padrão do input
}) => {
  const inputClassName = `bg-[#141414] border-[1px] border-[#333333] border-solid bg-opacity-50 rounded text-white hover:border-[#187BF0] ${className}`

  const InputComponent =
    isMask && mask ? (
      <InputMask
        id={id}
        mask={mask}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={inputClassName}
        {...rest} // Passa todas as outras props para o InputMask
      />
    ) : (
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={inputClassName}
        maxLength={maxLength} // Aplica o comprimento máximo se não estiver usando máscara
        {...rest} // Passa todas as outras props para o input
      />
    )

  return animation ? (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className="w-full"
    >
      {InputComponent}
    </motion.div>
  ) : (
    InputComponent
  )
}
