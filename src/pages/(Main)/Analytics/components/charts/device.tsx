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
  [device: string]: number | string
}

interface DeviceMetrics {
  device: string
  totalViews: number
  totalPlays: number
}

export const ChartDevice: FC<ChartProps> = ({ analytics, selectedVideo }) => {
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [deviceMetrics, setDeviceMetrics] = useState<DeviceMetrics[]>([])

  useEffect(() => {
    const totalDuration = 20 * 60 // 20 minutos em segundos
    const retentionData: { [device: string]: number[] } = {}
    const totalViewsByDevice: { [device: string]: number } = {}
    const totalPlaysByDevice: { [device: string]: number } = {}

    let maxEndTime = 0

    // Filtra visualizações que começam em 0
    const filteredViews = analytics.viewTimestamps.filter(
      (view) => Math.floor(view.startTimestamp) === 0,
    )

    filteredViews.forEach((view) => {
      const start = Math.floor(view.startTimestamp)
      const end = Math.min(Math.floor(view.endTimestamp), totalDuration)
      const device = view.deviceType || 'Unknown'

      if (!retentionData[device]) {
        retentionData[device] = Array(totalDuration + 1).fill(0)
        totalViewsByDevice[device] = 0
        totalPlaysByDevice[device] = 0
      }

      if (end > maxEndTime) {
        maxEndTime = end
      }

      for (let i = start; i <= end; i++) {
        retentionData[device][i]++
      }

      totalViewsByDevice[device]++
      totalPlaysByDevice[device] += end - start + 1
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

        for (const device in retentionData) {
          dataPoint[device] =
            (retentionData[device][index] / filteredViews.length) * 100
        }

        return dataPoint
      },
    )

    const metrics = Object.keys(totalViewsByDevice)
      .map((device) => ({
        device,
        totalViews: totalViewsByDevice[device],
        totalPlays: totalPlaysByDevice[device],
      }))
      .sort((a, b) => b.totalViews - a.totalViews) // Ordena por totalViews em ordem decrescente

    setChartData(retentionPercentages)
    setDeviceMetrics(metrics)
  }, [analytics, selectedVideo])

  const devices = Object.keys(chartData[0] || {}).filter(
    (key) => key !== 'date',
  )

  return (
    <div className="w-full">
      <AreaChart
        data={chartData}
        index="date"
        yAxisWidth={60}
        categories={devices}
        valueFormatter={dataFormatter}
        className="mt-4 w-full h-[75%]"
        onValueChange={(v) => console.log(v)}
        colors={['green', 'yellow', 'rose', 'red', 'blue', 'purple', 'indigo']}
      />
      <div className="mt-8">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Device</TableHeaderCell>
              <TableHeaderCell>Total Views</TableHeaderCell>
              <TableHeaderCell>Total Plays</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deviceMetrics.map((metric) => (
              <TableRow key={metric.device}>
                <TableCell>{metric.device}</TableCell>
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
