import * as Slider from '@radix-ui/react-slider'
import { useMediaRemote, useMediaState } from '@vidstack/react'

export function Volume() {
  const remote = useMediaRemote()
  const volume = useMediaState('volume')
  const isMuted = useMediaState('muted')
  const canSetVolume = useMediaState('canSetVolume')

  if (!canSetVolume) return null

  const sliderValue = isMuted ? [0] : [volume * 100]

  return (
    <Slider.Root
      className="group relative inline-flex h-10 w-full max-w-[80px] cursor-pointer touch-none select-none items-center outline-none"
      value={sliderValue}
      onValueChange={([value]) => {
        remote.changeVolume(value / 100)
      }}
    >
      <Slider.Track className="h-[5px] w-full rounded-sm bg-white/30 relative">
        <Slider.Range className="bg-media-brand absolute h-full rounded-sm will-change-[width]" />
      </Slider.Track>
      <Slider.Thumb
        aria-label="Volume"
        className="block h-[15px] w-[15px] rounded-full border border-[#cacaca] bg-white outline-none opacity-0 ring-white/40 transition-opacity group-hocus:opacity-100 focus:opacity-100 focus:ring-4 will-change-[left]"
      />
    </Slider.Root>
  )
}
