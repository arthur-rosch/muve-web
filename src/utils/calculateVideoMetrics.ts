import type { VideoAnalytics, VideoMetrics } from '../types'

export const calculateVideoMetrics = (
  analytics: VideoAnalytics,
): VideoMetrics => {
  const uniqueUserIp = new Set(
    analytics.viewTimestamps.map((view) => view.userIp),
  )
  const uniqueViewUserIp = new Set(
    analytics.viewUnique.map((view) => view.userIp),
  )

  const uniquePlays = uniqueUserIp.size
  const uniqueViews = uniqueViewUserIp.size
  const totalPlays = analytics.totalPlays
  const totalViews = analytics.viewUnique.length

  // Total do Tempo Assistido
  let totalPlayTime = 0
  analytics.viewTimestamps.forEach((view) => {
    const startTimestamp = Math.floor(view.startTimestamp)
    const endTimestamp = Math.floor(view.endTimestamp)
    // Certifique-se de que a duração de play não é negativa
    const playDuration = Math.max(
      Math.min(endTimestamp - startTimestamp, 20 * 60),
      0,
    )
    totalPlayTime += playDuration
  })

  // Duração do vídeo em segundos (20 minutos e 20 segundos)
  const videoDurationSeconds = 20 * 60 + 20

  // Calcular a taxa de engajamento
  const engagement =
    uniquePlays > 0
      ? (totalPlayTime / (uniquePlays * videoDurationSeconds)) * 100
      : 0

  // Calcular a taxa de play (play rate)
  const playRate = uniqueViews > 0 ? (uniquePlays / uniqueViews) * 100 : 0

  return {
    plays: totalPlays,
    uniquePlays,
    views: totalViews,
    uniqueViews,
    playRate: parseFloat(playRate.toFixed(2)),
    engagement: parseFloat(engagement.toFixed(2)), // Formata com 2 casas decimais
  }
}
