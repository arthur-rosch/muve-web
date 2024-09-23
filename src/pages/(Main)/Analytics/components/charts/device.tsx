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
    const totalDuration = convertDurationToSeconds(selectedVideo.duration)

    const totalViewsByDevice: { [device: string]: number } = {}
    const totalPlaysByDevice: { [device: string]: number } = {}
    const retentionData: { [device: string]: number[] } = {}

    let maxEndTime = 0

    // Contagem de views por dispositivo (ViewUnique)
    analytics.viewUnique.forEach((view) => {
      const device = view.deviceType || 'Unknown'

      if (!totalViewsByDevice[device]) {
        totalViewsByDevice[device] = 0
      }

      totalViewsByDevice[device]++
    })

    // Contagem de plays por dispositivo (ViewTimestamps)
    analytics.viewTimestamps.forEach((view) => {
      const device = view.deviceType || 'Unknown'

      if (!totalPlaysByDevice[device]) {
        totalPlaysByDevice[device] = 0
      }

      totalPlaysByDevice[device]++
    })
    console.log(totalPlaysByDevice)
    // Cálculo de retenção para cada dispositivo
    const filteredViews = analytics.viewTimestamps.filter(
      (view) => Math.floor(view.startTimestamp) === 0,
    )

    filteredViews.forEach((view, index) => {
      const device = view.deviceType || 'Unknown'
      let end = Math.min(Math.floor(view.endTimestamp), totalDuration)

      // Verificar se esse endTimestamp coincide com algum startTimestamp de outra view
      for (let i = index + 1; i < filteredViews.length; i++) {
        if (Math.floor(filteredViews[i].startTimestamp) === end) {
          end = Math.min(
            Math.floor(filteredViews[i].endTimestamp),
            totalDuration,
          )
          break
        }
      }

      if (!retentionData[device]) {
        retentionData[device] = Array(totalDuration + 1).fill(0)
      }

      if (end > maxEndTime) {
        maxEndTime = end
      }

      for (let i = 0; i <= end; i++) {
        retentionData[device][i]++
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

        for (const device in retentionData) {
          dataPoint[device] =
            (retentionData[device][index] / filteredViews.length) * 100
        }

        return dataPoint
      },
    )

    // Preparando as métricas de dispositivos
    const metrics = Object.keys(totalViewsByDevice)
      .map((device) => ({
        device,
        totalViews: totalViewsByDevice[device],
        totalPlays: totalPlaysByDevice[device],
      }))
      .sort((a, b) => b.totalViews - a.totalViews)

    // Atualiza os estados com as métricas calculadas
    setChartData(retentionPercentages)
    setDeviceMetrics(metrics)
  }, [analytics, selectedVideo])

  const devices = Object.keys(chartData[0] || {}).filter(
    (key) => key !== 'date',
  )

  return (
    <>
      <AreaChart
        data={chartData}
        index="date"
        yAxisWidth={60}
        categories={devices}
        valueFormatter={dataFormatter}
        className="mt-4 w-full h-[500px]"
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
    </>
  )
}
