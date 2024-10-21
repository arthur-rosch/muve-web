import { useEffect, useState, type FC } from 'react'
import type { ChartProps, ViewTimestamp } from '../../../../../types'
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

    // Inicializar os objetos de retenção por país
    const totalViewsByCountry: { [country: string]: number } = {}
    const totalPlaysByCountry: { [country: string]: number } = {}
    const retentionDataByCountry: { [country: string]: number[] } = {}
    let maxEndTime = 0

    // Contagem de visualizações únicas por país
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

    // Criar mapas por país para armazenar as visualizações com startTimestamp rapidamente
    const viewMapByCountry: {
      [country: string]: Map<number, ViewTimestamp[]>
    } = {}

    analytics.viewTimestamps.forEach((view) => {
      const country = view.country || 'Unknown'
      const start = Math.floor(view.startTimestamp)

      if (!viewMapByCountry[country]) {
        viewMapByCountry[country] = new Map<number, ViewTimestamp[]>()
      }

      if (!viewMapByCountry[country].has(start)) {
        viewMapByCountry[country].set(start, [])
      }

      viewMapByCountry[country].get(start)?.push(view)
    })

    // Função para encontrar visualizações encadeadas de forma otimizada
    const findChainedViews = (
      startView: ViewTimestamp,
      viewMap: Map<number, ViewTimestamp[]>,
      totalDuration: number,
    ) => {
      let endTimestamp = Math.min(
        Math.floor(startView.endTimestamp),
        totalDuration,
      )
      let nextViews = viewMap.get(endTimestamp)

      while (nextViews && nextViews.length > 0) {
        const nextView = nextViews.shift() // Pegar a próxima visualização disponível
        if (nextView) {
          endTimestamp = Math.min(
            Math.floor(nextView.endTimestamp),
            totalDuration,
          )
          nextViews = viewMap.get(endTimestamp)
        } else {
          break
        }
      }

      return endTimestamp
    }

    // Filtrar visualizações por país e calcular a retenção para cada país
    Object.keys(viewMapByCountry).forEach((country) => {
      const filteredViews = viewMapByCountry[country].get(0) || []

      // Inicializar o array de retenção para o país
      retentionDataByCountry[country] = Array(totalDuration + 1).fill(0)

      // Contar quantos usuários assistiram até cada segundo do vídeo
      filteredViews.forEach((view) => {
        const end = findChainedViews(
          view,
          viewMapByCountry[country],
          totalDuration,
        )

        // Incrementar a contagem de retenção para todos os segundos até o fim da visualização encadeada
        for (let i = 0; i <= end; i++) {
          retentionDataByCountry[country][i]++
        }

        if (end > maxEndTime) {
          maxEndTime = end
        }
      })
    })

    // Calcular a porcentagem de retenção por país
    const retentionPercentages: ChartData[] = Array.from(
      { length: maxEndTime + 1 },
      (_, index) => {
        const minutes = Math.floor(index / 60)
        const seconds = index % 60
        const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

        const dataPoint: ChartData = {
          date: formattedTime,
        }

        for (const country in retentionDataByCountry) {
          const totalFilteredViews =
            (viewMapByCountry[country].get(0) || []).length || 1 // Número total de visualizações (evitar divisão por zero)
          dataPoint[country] = Math.min(
            100,
            Math.max(
              0,
              (retentionDataByCountry[country][index] / totalFilteredViews) *
                100,
            ),
          )
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
    <>
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
      <div className="mt-8 hidden">
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
    </>
  )
}
