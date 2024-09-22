import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import { Step01 } from './step-01'
import { Step02 } from './step-02'
import { Step03 } from './step-03'

export type StepProps = {
  next: () => void
  back: () => void
}

const mappedSteps: React.ElementType<StepProps>[] = [Step01, Step02, Step03]

export const Steps = () => {
  const location = useLocation()
  const [step, setStep] = useState(
    location?.state ? Number(location.state.step) : 0,
  )

  const next = () => setStep((old) => (old === 0 ? 1 : old + 1))
  const back = () => setStep((old) => (old === 0 ? 0 : old - 1))

  const CurrentScreen = mappedSteps[step]

  return <CurrentScreen back={back} next={next} />
}
