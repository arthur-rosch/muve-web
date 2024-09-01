import clsx from 'clsx'
import type { FC } from 'react'
import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons'

interface CheckBoxProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  disabled?: boolean
  className?: string
  id?: string
}

export const CheckBox: FC<CheckBoxProps> = ({
  id,
  checked,
  className,
  disabled = false,
  onCheckedChange,
}) => {
  return (
    <div className={clsx('flex items-center', className)}>
      <Checkbox.Root
        id={id}
        checked={checked}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
        className={clsx(
          'w-6 h-6 border border-gray-600 rounded flex items-center justify-center',
          { 'bg-blue-500': checked, 'bg-transparent': !checked },
          { 'cursor-not-allowed': disabled },
        )}
      >
        <Checkbox.Indicator>
          {checked ? (
            <CheckIcon className="text-white" />
          ) : (
            <Cross2Icon className="text-gray-600" />
          )}
        </Checkbox.Indicator>
      </Checkbox.Root>
    </div>
  )
}
