import type { FC } from 'react'
import type { Video } from '../../../../types'
import { ChartCountry, ChartDevice, ChartRetention } from './charts'

interface ListChartsProps {
  typeChart: string
  video: Video
}

export const ListCharts: FC<ListChartsProps> = ({ typeChart, video }) => {
  return (
    <>
      {typeChart === 'retencao' ? (
        <ChartRetention analytics={video.analytics} selectedVideo={video} />
      ) : typeChart === 'pais' ? (
        <ChartCountry analytics={video.analytics} selectedVideo={video} />
      ) : (
        <ChartDevice analytics={video.analytics} selectedVideo={video} />
      )}
    </>
  )
}
