import { SubmenuButton } from './subMenuButtons'
import { Menu, usePlaybackRateOptions } from '@vidstack/react'
import {
  OdometerIcon,
  RadioButtonIcon,
  RadioButtonSelectedIcon,
} from '@vidstack/react/icons'

// Re-use styles across other submenus.
const submenuClassName =
  'hidden w-full flex-col items-start justify-center outline-none data-[keyboard]:mt-[3px] data-[open]:inline-block'
const radioClassName =
  'ring-sky-400 group relative flex w-full cursor-pointer select-none items-center justify-start rounded-sm p-2.5 outline-none data-[hocus]:bg-white/10 data-[focus]:ring-[3px]'
const radioIconClassName = 'h-4 w-4 text-white group-data-[checked]:hidden'
const radioSelectedIconClassName =
  'text-indigo-400 hidden h-4 w-4 group-data-[checked]:block'

export function SpeedSubmenu() {
  const options = usePlaybackRateOptions()
  const hint =
    options.selectedValue === '1' ? 'Normal' : options.selectedValue + 'x'
  return (
    <Menu.Root>
      <SubmenuButton
        label="Speed"
        hint={hint}
        disabled={options.disabled}
        icon={OdometerIcon}
      />
      <Menu.Content className={submenuClassName}>
        <Menu.RadioGroup
          className="w-full flex flex-col"
          value={options.selectedValue}
        >
          {options.map(({ label, value, select }) => (
            <Menu.Radio
              className={radioClassName}
              value={value}
              onSelect={select}
              key={value}
            >
              <RadioButtonIcon className={radioIconClassName} />
              <RadioButtonSelectedIcon className={radioSelectedIconClassName} />
              {label}
            </Menu.Radio>
          ))}
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu.Root>
  )
}
