import type { ChangeEventHandler, FC } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

interface InputSelectProps {
  options: { value: string; label: string }[]
  register?: UseFormRegisterReturn
  error?: string
  placeholder?: string
  className?: string
  onChange?: ChangeEventHandler<HTMLSelectElement>
}

export const InputSelect: FC<InputSelectProps> = ({
  options,
  register,
  error,
  className,
  onChange,
  placeholder = 'Selecione uma opção',
}) => {
  return (
    <div>
      <select
        {...register}
        onChange={onChange}
        className={`bg-[#141414] border-[1px] border-[#333333] border-solid bg-opacity-50 rounded text-white hover:border-[#187BF0] ${className}`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-red-500">{error}</span>}
    </div>
  )
}
