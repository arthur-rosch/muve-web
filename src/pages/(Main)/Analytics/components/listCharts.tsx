import type { FC } from 'react'
import type { Video } from '../../../../types'
import { ChartCountry, ChartDevice, ChartRetention } from './charts'
import { useEffect, useState } from 'react'

interface ListChartsProps {
  typeChart: string
  video: Video
}

export const ListCharts: FC<ListChartsProps> = ({ typeChart, video }) => {
  const [userPlan, setUserPlan] = useState<string>('')

  useEffect(() => {
    // Buscar o plano do localStorage
    const storedPlan = localStorage.getItem('@storage:plan')
    if (storedPlan) {
      try {
        const parsedPlan = JSON.parse(storedPlan)
        setUserPlan(parsedPlan.plan) // Assumindo que o plano está neste formato
      } catch (error) {
        console.error(
          'Erro ao buscar o plano do usuário no localStorage:',
          error,
        )
      }
    }
  }, [])

  // Função que verifica se o gráfico precisa ser borrado
  const isBlurredChart = (chartType: string) => {
    return (
      userPlan === 'ESSENTIAL' &&
      (chartType === 'pais' || chartType === 'dispositivos')
    )
  }

  return (
    <div
      className={`w-full h-full mt-8 ${isBlurredChart(typeChart) ? 'filter blur-sm' : ''}`}
    >
      {typeChart === 'retencao' ? (
        <ChartRetention analytics={video.analytics} selectedVideo={video} />
      ) : typeChart === 'pais' ? (
        <ChartCountry analytics={video.analytics} selectedVideo={video} />
      ) : (
        <ChartDevice analytics={video.analytics} selectedVideo={video} />
      )}
    </div>
  )
}
