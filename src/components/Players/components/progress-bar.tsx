interface ProgressBarProps {
  color: string
  progress: number
  size: string | undefined
  transitionDuration: number
}

export function ProgressBar({
  size,
  color,
  progress,
  transitionDuration,
}: ProgressBarProps) {
  return (
    <div className="absolute bottom-0 left-0 w-full z-50">
      <div
        className={`relative w-full`}
        style={{
          height: size || '20px',
        }}
      >
        <div
          className={`absolute top-0 left-0 h-full`}
          style={{
            width: `${progress}%`,
            background: `${color}`,
            transition: `width ${transitionDuration}ms ease-out`,
          }}
        />
      </div>
    </div>
  )
}
