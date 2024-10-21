import type { VideoAnalytics, VideoMetrics } from '../types'

export const calculateVideoMetrics = (
  videoDurationSeconds: number,
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

  const engagement =
    uniquePlays > 0
      ? (totalPlayTime / (uniquePlays * videoDurationSeconds)) * 100
      : 0

  console.log(engagement)
  const playRate = uniqueViews > 0 ? (uniquePlays / uniqueViews) * 100 : 0

  return {
    uniquePlays,
    uniqueViews,
    views: analytics.totalViews,
    plays: analytics.totalPlays,
    playRate: parseFloat(playRate.toFixed(2)),
    engagement: parseFloat(engagement.toFixed(2)),
  }
}
