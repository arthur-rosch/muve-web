import { useEffect, useState } from 'react'
import * as Slider from '@radix-ui/react-slider'
import {
  useMediaState,
  useMediaRemote,
  useSliderPreview,
} from '@vidstack/react'

export function Time() {
  const remote = useMediaRemote()
  const canSeek = useMediaState('canSeek')
  const seeking = useMediaState('seeking')
  const duration = useMediaState('duration')
  const time = useMediaState('currentTime')
  const { previewRootRef } = useSliderPreview({
    clamp: true,
    offset: 6,
    orientation: 'horizontal',
  })

  const step = (1 / duration) * 100
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!seeking) {
      setValue((time / duration) * 100)
    }
  }, [time, duration, seeking])

  return (
    <Slider.Root
      className="group relative inline-flex h-9 w-full cursor-pointer touch-none select-none items-center outline-none"
      value={[value]}
      disabled={!canSeek}
      step={Number.isFinite(step) ? step : 1}
      ref={previewRootRef}
      onValueChange={([value]) => {
        setValue(value)
        remote.seeking((value / 100) * duration)
      }}
      onValueCommit={([value]) => {
        remote.seek((value / 100) * duration)
      }}
      draggable={true}
    >
      <Slider.Track className="h-[5px] w-full rounded-sm bg-white/30 relative">
        <Slider.Range className="bg-media-brand absolute h-full rounded-sm will-change-[width]" />
      </Slider.Track>

      <Slider.Thumb
        aria-label="Current Time"
        className="block h-[15px] w-[15px] rounded-full border border-[#cacaca] bg-white outline-none opacity-0 ring-white/40 transition-opacity group-hocus:opacity-100 focus:opacity-100 focus:ring-4 will-change-[left]"
      />
    </Slider.Root>
  )
}
