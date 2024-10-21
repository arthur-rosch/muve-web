import { Menu } from '@vidstack/react'
import { InfoIcon } from '@vidstack/react/icons'

export const MenuInfo = () => {
  return (
    <Menu.Root>
      <Menu.Button
        className="group ring-sky-400 relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4"
        aria-label="Settings"
      >
        <InfoIcon className="h-8 w-8 transform transition-transform duration-200 ease-out group-data-[open]:rotate-90" />
      </Menu.Button>
      <Menu.Items
        className="animate-out fade-out slide-out-to-bottom-2 data-[open]:animate-in data-[open]:fade-in data-[open]:slide-in-from-bottom-4 flex h-[var(--menu-height)] max-h-[400px] min-w-[260px] flex-col overflow-y-auto overscroll-y-contain rounded-md border border-white/10 bg-black/95 p-2.5 font-sans text-[15px] font-medium outline-none backdrop-blur-sm transition-[height] duration-300 will-change-[height] data-[resizing]:overflow-hidden"
        placement="top"
        offset={0}
      >
        <span className="ml-1.5 parent-data-[open]:ml-0 my-2 hover:text-gray-500">
          Sobre o Muve
        </span>
        <span className="ml-1.5 parent-data-[open]:ml-0 my-2 hover:text-gray-500">
          Reportar o erro
        </span>
      </Menu.Items>
    </Menu.Root>
  )
}
