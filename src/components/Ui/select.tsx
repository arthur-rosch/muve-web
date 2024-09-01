import type { FC } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

interface InputSelectProps {
  options: { value: string; label: string }[]
  register?: UseFormRegisterReturn
  error?: string
  placeholder?: string
}

export const InputSelect: FC<InputSelectProps> = ({
  options,
  register,
  error,
  placeholder = 'Selecione uma opção',
}) => {
  return (
    <div>
      <select
        {...register}
        className={`w-full h-14 bg-[#1d1f21] text-white border border-gray-600 rounded-md p-2 focus:border-[#217CE5] focus:outline-none ${
          error ? 'border-red-500' : ''
        }`}
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
