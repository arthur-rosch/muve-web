import type { Chapters } from '../../../types'
import * as Tooltip from '@radix-ui/react-tooltip'
import { ChapterTitle, Controls, Gesture } from '@vidstack/react'
import {
  Mute,
  Play,
  Volume,
  TimeGroup,
  MenuPlayer,
  Fullscreen,
  ChapterMenu,
  TimeChapter,
  Seek,
} from '../components'

const popupOffset = 30

interface VideoLayoutProps {
  type: 'Vsl' | 'Curso'
  chapters?: Chapters[]
}

export function VideoLayout({ type, chapters }: VideoLayoutProps) {
  return (
    <>
      <Gestures />
      {type === 'Curso' && (
        <Controls.Root className="media-controls:opacity-100 absolute inset-0 z-10 flex h-auto w-full flex-col bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity">
          <Tooltip.Provider>
            <div className="flex-1" />
            <Controls.Group className="flex w-full items-center px-2">
              <TimeChapter />
            </Controls.Group>
            <Controls.Group className="-mt-0.5 flex w-full items-center px-2 pb-2">
              <Play tooltipAlign="start" tooltipOffset={popupOffset} />
              <Mute tooltipOffset={popupOffset} />
              <Volume />
              <TimeGroup />
              <ChapterTitle />
              <div className="flex-1" />
              <Seek />
              <ChapterMenu chapters={chapters!} />
              <MenuPlayer />
              <Fullscreen tooltipAlign="end" tooltipOffset={popupOffset} />
            </Controls.Group>
          </Tooltip.Provider>
        </Controls.Root>
      )}
    </>
  )
}

function Gestures() {
  return (
    <>
      <Gesture
        className="absolute inset-0 z-0 block h-full w-full"
        event="pointerup"
        action="toggle:paused"
      />
      <Gesture
        className="absolute inset-0 z-0 block h-full w-full"
        event="dblpointerup"
        action="toggle:fullscreen"
      />
      <Gesture
        className="absolute left-0 top-0 z-10 block h-full w-1/5"
        event="dblpointerup"
        action="seek:-10"
      />
      <Gesture
        className="absolute right-0 top-0 z-10 block h-full w-1/5"
        event="dblpointerup"
        action="seek:10"
      />
    </>
  )
}
