import { useEffect, useState, type FC } from 'react'
import { dataFormatter } from '../../../../../utils'
import type { ChartProps } from '../../../../../types'
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

export const ChartRegion: FC<ChartProps> = ({ analytics, selectedVideo }) => {
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [countryMetrics, setCountryMetrics] = useState<CountryMetrics[]>([])

  useEffect(() => {
    const totalDuration = 20 * 60 // 20 minutos em segundos
    const retentionData: { [country: string]: number[] } = {}
    const totalViewsByCountry: { [country: string]: number } = {}
    const totalPlaysByCountry: { [country: string]: number } = {}

    let maxEndTime = 0

    analytics.viewTimestamps
      .filter((view) => Math.floor(view.startTimestamp) === 0)
      .forEach((view) => {
        const start = Math.floor(view.startTimestamp)
        const end = Math.min(Math.floor(view.endTimestamp), totalDuration)
        const country = view.country || 'Unknown'

        if (!retentionData[country]) {
          retentionData[country] = Array(totalDuration + 1).fill(0)
          totalViewsByCountry[country] = 0
          totalPlaysByCountry[country] = 0
        }

        if (end > maxEndTime) {
          maxEndTime = end
        }

        for (let i = start; i <= end; i++) {
          retentionData[country][i]++
        }

        totalViewsByCountry[country]++
        totalPlaysByCountry[country] += end - start + 1
      })

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
            (retentionData[country][index] /
              analytics.viewTimestamps.filter(
                (view) =>
                  Math.floor(view.startTimestamp) === 0 &&
                  view.country === country,
              ).length) *
            100
        }

        return dataPoint
      },
    )

    const metrics = Object.keys(totalViewsByCountry)
      .map((country) => ({
        country,
        totalViews: totalViewsByCountry[country],
        totalPlays: totalPlaysByCountry[country],
      }))
      .sort((a, b) => b.totalViews - a.totalViews) // Ordena por totalViews em ordem decrescente

    setChartData(retentionPercentages)
    setCountryMetrics(metrics)
  }, [analytics, selectedVideo])

  const countries = Object.keys(chartData[0] || {}).filter(
    (key) => key !== 'date',
  )

  return (
    <div className="w-full">
      <AreaChart
        className="mt-4 w-full h-[75%]"
        data={chartData}
        index="date"
        categories={countries}
        colors={['indigo', 'rose', 'green', 'yellow', 'red', 'blue', 'purple']}
        valueFormatter={dataFormatter}
        yAxisWidth={60}
        onValueChange={(v) => console.log(v)}
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
