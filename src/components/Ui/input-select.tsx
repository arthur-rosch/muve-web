import * as React from "react"
import { cn } from "../../utils"
import type { ControllerRenderProps } from "react-hook-form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"


interface Option {
  value: string
  label: string
}

interface InputSelectProps extends Partial<ControllerRenderProps> {
  options: Option[]
  error?: string
  className?: string
  placeholder?: string
  variant?: "default" | "filled"
  size?: "default" | "sm" | "lg"
}

const InputSelect = React.forwardRef<HTMLButtonElement, InputSelectProps>(({ 
  options, 
  error, 
  className,
  placeholder,
  variant = "default",
  size = "default",
  onChange,
  value,
  name,
  ...props 
}, ref) => {
  const handleValueChange = (newValue: string) => {
    onChange?.(newValue)
  }

  return (
    <div className="relative">
      <Select
        value={value}
        name={name}
        onValueChange={handleValueChange}
        {...props}
      >
        <SelectTrigger
          ref={ref}
          className={cn(
            variant === "default" && "bg-[#141414] border-[#333333] text-white placeholder:text-gray-500",
            variant === "filled" && "bg-[#2A2A2A] border-[#3A3A3A] text-white placeholder:text-gray-500",
            size === "default" && "h-10",
            size === "sm" && "h-8 px-2",
            size === "lg" && "h-12 px-4",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem 
              key={option.value} 
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <span className="text-red-500 text-sm mt-1 block">
          {error}
        </span>
      )}
    </div>
  )
})

InputSelect.displayName = "InputSelect"

export { InputSelect }
export type { InputSelectProps }