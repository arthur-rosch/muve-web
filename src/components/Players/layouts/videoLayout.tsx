import type { Chapters, Video } from '../../../types'
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
  MenuInfo,
} from '../components'

const popupOffset = 30

interface VideoLayoutProps {
  video: Video
  chapters?: Chapters[]
}

export function VideoLayout({ video, chapters }: VideoLayoutProps) {
  return (
    <>
      <Gestures />

        <Controls.Root className="media-controls:opacity-100 absolute inset-0 flex h-auto w-full flex-col bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity z-50">
          <Tooltip.Provider>
            <div className="flex-1" />
            {video.type !== 'Vsl' && 
              <Controls.Group className="flex w-full items-center px-2">
                <TimeChapter />
              </Controls.Group>
            }
            <Controls.Group className="-mt-0.5 flex w-full items-center px-2 pb-2">
              {video.playAndPause && (
                <Play tooltipAlign="start" tooltipOffset={popupOffset} />
              )}
              {video.volumeButton && <Mute tooltipOffset={popupOffset} />}

              {video.volumeBar && <Volume />}
              
              <TimeGroup
                timeCurrent={video.timeTraveled}
                timeDuration={video.videoDuration}
              />
              

              <ChapterTitle />
              <div className="flex-1" />
              {video.speed && <Seek />}
              {video.chapterMenu && <ChapterMenu chapters={chapters!} />}
              {video.type !== 'Vsl' && 
              <>
                <MenuPlayer menuSpeed={video.speed} />
                <MenuInfo />
              </>
              }
              {video.fullscreen && (
                <Fullscreen tooltipAlign="end" tooltipOffset={popupOffset} />
              )}
            </Controls.Group>
          </Tooltip.Provider>
        </Controls.Root>
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
