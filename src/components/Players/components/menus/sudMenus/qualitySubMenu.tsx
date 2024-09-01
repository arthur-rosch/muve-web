import { SubmenuButton } from './subMenuButtons'
import { Menu, useVideoQualityOptions } from '@vidstack/react'
import {
  RadioButtonIcon,
  RadioButtonSelectedIcon,
  SettingsMenuIcon,
} from '@vidstack/react/icons'

const submenuClassName =
  'hidden w-full flex-col items-start justify-center outline-none data-[keyboard]:mt-[3px] data-[open]:inline-block'
const radioClassName =
  'ring-sky-400 group relative flex w-full cursor-pointer select-none items-center justify-start rounded-sm p-2.5 outline-none data-[hocus]:bg-white/10 data-[focus]:ring-[3px]'
const radioIconClassName = 'h-4 w-4 text-white group-data-[checked]:hidden'
const radioSelectedIconClassName =
  'text-indigo-400 hidden h-4 w-4 group-data-[checked]:block'

export function QualitySubmenu() {
  const options = useVideoQualityOptions()
  const currentQuality = options.selectedQuality?.height
  const hint =
    options.selectedValue !== 'auto' && currentQuality
      ? `${currentQuality}p`
      : `Auto${currentQuality ? ` (${currentQuality}p)` : ''}`
  return (
    <Menu.Root>
      <SubmenuButton
        label="Quality"
        hint={hint}
        disabled={options.disabled}
        icon={SettingsMenuIcon}
      />
      <Menu.Content className={submenuClassName}>
        <Menu.RadioGroup
          className="w-full flex flex-col"
          value={options.selectedValue}
        >
          {options.map(({ label, value, bitrateText, select }) => (
            <Menu.Radio
              className={radioClassName}
              value={value}
              onSelect={select}
              key={value}
            >
              <RadioButtonIcon className={radioIconClassName} />
              <RadioButtonSelectedIcon className={radioSelectedIconClassName} />
              {label}
              {bitrateText ? (
                <span className="text-[13px] text-gray-300 ml-auto">
                  {bitrateText}
                </span>
              ) : null}
            </Menu.Radio>
          ))}
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu.Root>
  )
}
