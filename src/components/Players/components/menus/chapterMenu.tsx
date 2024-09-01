import { Menu, useMediaRemote } from '@vidstack/react'
import { ChaptersIcon } from '@vidstack/react/icons'

// Função para converter MM:SS para segundos
const convertToSeconds = (timeString: string) => {
  const [minutes, seconds] = timeString.split(':').map(Number)
  return minutes * 60 + seconds
}

export function ChapterMenu() {
  const remote = useMediaRemote()

  // Função para buscar o tempo do capítulo em segundos
  const handleSeek = (timeString: string) => {
    const newCurrentTime = convertToSeconds(timeString)
    remote.seek(newCurrentTime)
  }

  return (
    <Menu.Root className="chapter-menu">
      <Menu.Button className="vds-menu-button vds-button" aria-label="Chapters">
        <ChaptersIcon />
      </Menu.Button>
      <Menu.Items
        className="animate-out fade-out slide-out-to-bottom-2 data-[open]:animate-in data-[open]:fade-in data-[open]:slide-in-from-bottom-4 flex h-[var(--menu-height)] max-h-[400px] min-w-[260px] flex-col overflow-y-auto overscroll-y-contain rounded-md border border-white/10 bg-black/95 p-2.5 font-sans text-[15px] font-medium outline-none backdrop-blur-sm transition-[height] duration-300 will-change-[height] data-[resizing]:overflow-hidden"
        placement="top end"
        offset={10}
      >
        <div
          className="mb-4 border-l-4 border-blue-500 px-6 hover:opacity-75 cursor-pointer mr-12"
          onClick={() => handleSeek('00:00')}
        >
          <div className="text-white text-lg">Capítulo 1</div>
          <div className="bg-opacity-50 backdrop-filter backdrop-blur-lg text-white text-sm px-2 py-1 rounded w-12">
            00:00
          </div>
          <div className="text-gray-500 text-xs">10 sec</div>
        </div>
        <div
          className="mb-4 border-l-4 border-blue-500 px-6 hover:opacity-75 cursor-pointer"
          onClick={() => handleSeek('01:00')}
        >
          <div className="text-white text-lg">Capítulo 2</div>
          <div className="bg-opacity-50 backdrop-filter backdrop-blur-lg text-white text-sm px-2 py-1 rounded w-12">
            01:00
          </div>
          <div className="text-gray-500 text-xs">20 sec</div>
        </div>
        <div
          className="mb-4 border-l-4 border-blue-500 px-6 hover:opacity-75 cursor-pointer"
          onClick={() => handleSeek('02:00')}
        >
          <div className="text-white text-lg">Capítulo 3</div>
          <div className="bg-opacity-50 backdrop-filter backdrop-blur-lg text-white text-sm px-2 py-1 rounded w-12">
            02:00
          </div>
          <div className="text-gray-500 text-xs">15 sec</div>
        </div>
      </Menu.Items>
    </Menu.Root>
  )
}
