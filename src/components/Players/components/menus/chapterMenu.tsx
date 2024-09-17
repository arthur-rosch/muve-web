import { ChaptersIcon } from '@vidstack/react/icons'
import type { Chapters } from '../../../../types'
import { Menu, useMediaRemote } from '@vidstack/react'
import { convertDurationToSeconds } from '../../../../utils'

interface ChapterMenuProps {
  chapters: Chapters[] | []
}

export function ChapterMenu({ chapters }: ChapterMenuProps) {
  const remote = useMediaRemote()

  const handleSeek = (timeString: string) => {
    const newCurrentTime = convertDurationToSeconds(timeString)
    remote.seek(newCurrentTime)
  }
  console.log(chapters)
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
        {chapters.length > 0 ? (
          chapters.map((chapter, index) => (
            <div
              key={index}
              className="mb-4 border-l-4 border-blue-500 px-6 hover:opacity-75 cursor-pointer mr-12"
              onClick={() => handleSeek(chapter.startTime)}
            >
              <div className="text-white text-lg">{chapter.title}</div>
              <div className="bg-opacity-50 backdrop-filter backdrop-blur-lg text-white text-sm px-2 py-1 rounded w-12">
                {chapter.startTime}
              </div>
              <div className="text-gray-500 text-xs">
                {parseInt(chapter.endTime) - parseInt(chapter.startTime)} sec
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-xs">
            Nenhum capitulo cadastrado
          </div>
        )}
      </Menu.Items>
    </Menu.Root>
  )
}
