import { useEffect, useState, type FC } from 'react'
import type { ChartProps } from '../../../../../types'
import { convertDurationToSeconds, dataFormatter } from '../../../../../utils'
import {
  Table,
  TableRow,
  TableBody,
  AreaChart,
  TableCell,
  TableHead,
  TableHeaderCell,
} from '@tremor/react'

interface ChartData {
  date: string
  [country: string]: number | string
}

interface CountryMetrics {
  country: string
  totalViews: number
  totalPlays: number
}

export const ChartCountry: FC<ChartProps> = ({ analytics, selectedVideo }) => {
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [countryMetrics, setCountryMetrics] = useState<CountryMetrics[]>([])

  useEffect(() => {
    const totalDuration = convertDurationToSeconds(selectedVideo.duration)

    const totalViewsByCountry: { [country: string]: number } = {}
    const totalPlaysByCountry: { [country: string]: number } = {}
    const retentionData: { [country: string]: number[] } = {}

    let maxEndTime = 0

    analytics.viewUnique.forEach((view) => {
      const country = view.country || 'Unknown'

      if (!totalViewsByCountry[country]) {
        totalViewsByCountry[country] = 0
      }

      totalViewsByCountry[country]++
    })

    // Contagem de plays por país (ViewTimestamps)
    analytics.viewTimestamps.forEach((view) => {
      const country = view.country || 'Unknown'

      if (!totalPlaysByCountry[country]) {
        totalPlaysByCountry[country] = 0
      }

      totalPlaysByCountry[country]++
    })

    const filteredViews = analytics.viewTimestamps.filter(
      (view) => Math.floor(view.startTimestamp) === 0,
    )

    filteredViews.forEach((view, index) => {
      const country = view.country || 'Unknown'
      let end = Math.min(Math.floor(view.endTimestamp), totalDuration)

      for (let i = index + 1; i < filteredViews.length; i++) {
        if (Math.floor(filteredViews[i].startTimestamp) === end) {
          end = Math.min(
            Math.floor(filteredViews[i].endTimestamp),
            totalDuration,
          )
          break
        }
      }

      if (!retentionData[country]) {
        retentionData[country] = Array(totalDuration + 1).fill(0)
      }

      if (end > maxEndTime) {
        maxEndTime = end
      }

      for (let i = 0; i <= end; i++) {
        retentionData[country][i]++
      }
    })

    // Construção do gráfico de retenção
    const retentionPercentages: ChartData[] = Array.from(
      { length: maxEndTime + 1 },
      (_, index) => {
        const minutes = Math.floor(index / 60)
        const seconds = index % 60
        const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

        const dataPoint: ChartData = {
          date: formattedTime,
        }

        for (const country in retentionData) {
          dataPoint[country] =
            (retentionData[country][index] / filteredViews.length) * 100
        }

        return dataPoint
      },
    )

    // Preparando as métricas de países
    const metrics = Object.keys(totalViewsByCountry)
      .map((country) => ({
        country,
        totalViews: totalViewsByCountry[country],
        totalPlays: totalPlaysByCountry[country],
      }))
      .sort((a, b) => b.totalViews - a.totalViews) // Ordena por totalViews em ordem decrescente

    // Atualiza os estados com as métricas calculadas
    setChartData(retentionPercentages)
    setCountryMetrics(metrics)
  }, [analytics, selectedVideo])

  const countries = Object.keys(chartData[0] || {}).filter(
    (key) => key !== 'date',
  )

  return (
    <div className="max-h-[500px] overflow-auto">
      <AreaChart
        data={chartData}
        index="date"
        yAxisWidth={60}
        categories={countries}
        valueFormatter={dataFormatter}
        className="mt-4 w-full h-[500px]"
        onValueChange={(v) => console.log(v)}
        colors={['red', 'yellow', 'rose', 'blue', 'purple', 'indigo']}
      />
      <div className="mt-8">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Country</TableHeaderCell>
              <TableHeaderCell>Total Views</TableHeaderCell>
              <TableHeaderCell>Total Plays</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countryMetrics.map((metric) => (
              <TableRow key={metric.country}>
                <TableCell>{metric.country}</TableCell>
                <TableCell>{metric.totalViews}</TableCell>
                <TableCell>{metric.totalPlays}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
