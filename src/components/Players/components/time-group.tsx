import { Time } from '@vidstack/react'

interface TimeGroupProps {
  timeCurrent: boolean | undefined
  timeDuration: boolean | undefined
}

export function TimeGroup({ timeCurrent, timeDuration }: TimeGroupProps) {
  return (
    <div className="ml-2.5 flex items-center text-sm font-medium">
      {timeCurrent && <Time className="time" type="current" />}
      {timeDuration && (
        <>
          <div className="mx-1 text-white/80">/</div>
          <Time className="time" type="duration" />
        </>
      )}
    </div>
  )
}
