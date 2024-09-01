import type { FC } from 'react'
import { Card } from '@tremor/react'

interface CardProps {
  text: string
  information: number | string
}

export const CardMetrics: FC<CardProps> = ({ information, text }) => {
  return (
    <Card decoration="top" className="mx-auto max-w-xs" decorationColor="blue">
      <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        {text}
      </p>
      <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
        {information}
      </p>
    </Card>
  )
}
