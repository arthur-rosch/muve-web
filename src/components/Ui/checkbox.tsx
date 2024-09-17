import clsx from 'clsx'
import type { FC } from 'react'
import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

interface CheckBoxProps {
  checked?: boolean
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
          'w-6 h-6 border border-gray-600 rounded flex items-center justify-center transition-colors duration-300 ',
        )}
        data-state={disabled ? 'unchecked' : 'checked'} // This should be dynamically set based on the actual state
        data-disabled={disabled ? '' : undefined}
      >
        <Checkbox.Indicator>
          <CheckIcon className="text-white" />
        </Checkbox.Indicator>
      </Checkbox.Root>
    </div>
  )
}
