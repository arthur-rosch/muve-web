import type {
  VideoAnalytics,
  VideoMetrics,
  ViewTimestamp,
  ViewUnique,
} from '../types'

export const calculateVideoMetrics = (
  videoDurationSeconds: number,
  analytics: VideoAnalytics,
): VideoMetrics => {
  const oneHourInMilliseconds = 60 * 60 * 1000

  // Função para filtrar e contar plays únicos por intervalo de 1 hora
  const getUniquePlaysByHour = (viewTimestamps: ViewTimestamp[]) => {
    const uniquePlays = new Set<string>()

    viewTimestamps.forEach((view) => {
      const currentTimestamp = new Date(view.created_at).getTime()

      // Verifica se esse IP já foi registrado em um play recente (1 hora)
      const existingPlay = Array.from(uniquePlays).find((uniqueViewIp) => {
        const [uniqueIp, timestamp] = uniqueViewIp.split('_')
        return (
          uniqueIp === view.userIp &&
          currentTimestamp - Number(timestamp) < oneHourInMilliseconds
        )
      })

      // Se não houver um play recente desse IP, adiciona como único
      if (!existingPlay) {
        uniquePlays.add(`${view.userIp}_${currentTimestamp}`)
      }
    })

    return uniquePlays.size
  }

  // Função para filtrar e contar views únicos por intervalo de 1 hora
  const getUniqueViewsByHour = (viewUnique: ViewUnique[]) => {
    const uniqueViews = new Set<string>()

    viewUnique.forEach((view) => {
      const currentTimestamp = new Date(view.created_at).getTime()

      // Verifica se esse IP já foi registrado em uma visualização recente (1 hora)
      const existingView = Array.from(uniqueViews).find((uniqueViewIp) => {
        const [uniqueIp, timestamp] = uniqueViewIp.split('_')
        return (
          uniqueIp === view.userIp &&
          currentTimestamp - Number(timestamp) < oneHourInMilliseconds
        )
      })

      // Se não houver uma view recente desse IP, adiciona como única
      if (!existingView) {
        uniqueViews.add(`${view.userIp}_${currentTimestamp}`)
      }
    })

    return uniqueViews.size
  }

  // Agora, use as funções acima para obter as contagens corretas
  const uniquePlays = getUniquePlaysByHour(analytics.viewTimestamps)
  const uniqueViews = getUniqueViewsByHour(analytics.viewUnique)

  let totalPlayTime = 0
  analytics.viewTimestamps.forEach((view) => {
    const startTimestamp = Math.floor(view.startTimestamp)
    const endTimestamp = Math.floor(view.endTimestamp)

    const playDuration = Math.max(Math.min(endTimestamp - startTimestamp), 0)
    totalPlayTime += playDuration
  })

  const engagement =
    uniquePlays > 0
      ? Math.min(
          (totalPlayTime / (uniquePlays * videoDurationSeconds)) * 100,
          100,
        )
      : 0

  const playRate =
    uniqueViews > 0 ? Math.min((uniquePlays / uniqueViews) * 100, 100) : 0

  return {
    uniquePlays,
    uniqueViews,
    views: analytics.totalViews,
    plays: analytics.totalPlays,
    playRate: parseFloat(playRate.toFixed(2)),
    engagement: parseFloat(engagement.toFixed(2)),
  }
}
