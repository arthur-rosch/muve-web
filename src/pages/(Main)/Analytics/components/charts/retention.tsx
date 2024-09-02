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
  Badge,
  ProgressBar,
} from '@tremor/react'

interface RetentionMetrics {
  views: number
  startTime: string
  endTime: string
  status: string
  percentage: number
}

export const ChartRetention: FC<ChartProps> = ({
  analytics,
  selectedVideo,
}) => {
  const [chartData, setChartData] = useState<
    { date: string; Retenção: number }[]
  >([])
  const [retentionMetrics, setRetentionMetrics] = useState<RetentionMetrics[]>(
    [],
  )

  const getBadgeColor = (status: string) => {
    switch (status) {
      case 'Bom':
        return 'emerald'
      case 'Mais ou Menos':
        return 'yellow'
      case 'Ruim':
        return 'orange'
      case 'Pior':
        return 'red'
      default:
        return 'gray'
    }
  }

  useEffect(() => {
    const interval = 60
    const totalDuration = convertDurationToSeconds(selectedVideo.duration)
    const numIntervals = Math.ceil(totalDuration / interval)

    let maxEndTime = 0
    const retentionArray = Array(totalDuration + 1).fill(0)

    const filteredViews = analytics.viewTimestamps
      .filter((view) => Math.floor(view.startTimestamp) === 0)
      .sort((a, b) => a.startTimestamp - b.startTimestamp)

    filteredViews.forEach((view, index) => {
      const start = Math.floor(view.startTimestamp)
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

      if (end > maxEndTime) {
        maxEndTime = end
      }

      for (let i = start; i <= end; i++) {
        retentionArray[i]++
      }
    })

    const totalFilteredViews = filteredViews.length

    const retentionPercentages = retentionArray
      .slice(0, maxEndTime + 1)
      .map((count, index) => {
        const minutes = Math.floor(index / 60)
        const seconds = index % 60
        const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

        return {
          date: formattedTime,
          Retenção: (count / totalFilteredViews) * 100,
        }
      })

    setChartData(retentionPercentages)

    const tableMetrics: RetentionMetrics[] = Array(numIntervals)
      .fill(0)
      .map((_, index) => {
        const startSeconds = index * interval
        const endSeconds = Math.min((index + 1) * interval, totalDuration)

        const startTime = `${String(Math.floor(startSeconds / 60)).padStart(2, '0')}:${String(startSeconds % 60).padStart(2, '0')}`
        const endTime = `${String(Math.floor(endSeconds / 60)).padStart(2, '0')}:${String(endSeconds % 60).padStart(2, '0')}`

        const playsInInterval = filteredViews.filter((play) => {
          return (
            play.startTimestamp <= endSeconds &&
            play.endTimestamp >= startSeconds
          )
        }).length

        const percentage = (playsInInterval / filteredViews.length) * 100

        let status = ''
        if (percentage >= 80) status = 'Bom'
        else if (percentage >= 50) status = 'Mais ou Menos'
        else if (percentage >= 30) status = 'Ruim'
        else if (percentage >= 15) status = 'Pior'

        return {
          views: playsInInterval,
          startTime,
          endTime,
          status,
          percentage,
        }
      })

    setRetentionMetrics(tableMetrics)
  }, [analytics, selectedVideo])

  return (
    <>
      <AreaChart
        data={chartData}
        index="date"
        yAxisWidth={60}
        colors={['blue']}
        className="mt-4 w-full h-[75%]"
        categories={['Retenção']}
        valueFormatter={dataFormatter}
        onValueChange={(v) => console.log(v)}
        noDataText="Nenhum dado disponível"
      />
      <div className="mt-8">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Total Views</TableHeaderCell>
              <TableHeaderCell>Inicio</TableHeaderCell>
              <TableHeaderCell>Fim</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>% Visualizado</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {retentionMetrics.map((metric, index) => (
              <TableRow key={index}>
                <TableCell>{metric.views}</TableCell>
                <TableCell>{metric.startTime}</TableCell>
                <TableCell>{metric.endTime}</TableCell>
                <TableCell>
                  <Badge color={getBadgeColor(metric.status)}>
                    {metric.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="w-full">
                      <ProgressBar
                        value={metric.percentage}
                        color={getBadgeColor(metric.status)}
                        className="h-3"
                      />
                    </div>
                    <span className="ml-2 text-sm">
                      {metric.percentage.toFixed(1)}%
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
