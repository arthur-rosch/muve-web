import type { ViewTimestamp, Folder, Video } from '../types'

const convertSecondsToMinutes = (seconds: number) => seconds / 60
const convertSecondsToHours = (seconds: number) => seconds / 3600

const calculateTotalWatchedTime = (viewTimestamps: ViewTimestamp[]) => {
  let totalSeconds = 0

  viewTimestamps.forEach((timestamp) => {
    const { endTimestamp, startTimestamp } = timestamp
    totalSeconds += endTimestamp - startTimestamp
  })

  const totalMinutes = convertSecondsToMinutes(totalSeconds)
  const totalHours = convertSecondsToHours(totalSeconds)

  return {
    totalMinutes,
    totalHours,
    totalSeconds,
  }
}

// Função para calcular métricas de pasta e vídeos que não estão em pastas
export const calculateDashboardMetrics = (
  folders: Folder[],
  videosWithoutFolders: Video[],
) => {
  let totalVideos = 0
  let totalMinutesWatched = 0
  let totalHoursWatched = 0
  const videoWatchTimes: { video: Video; totalSeconds: number }[] = []

  // Calcula para vídeos dentro das pastas
  folders.forEach((folder) => {
    totalVideos += folder.videos.length

    folder.videos.forEach((video) => {
      const videoAnalytics = video.analytics
      const { viewTimestamps } = videoAnalytics

      const { totalMinutes, totalHours, totalSeconds } =
        calculateTotalWatchedTime(viewTimestamps)

      totalMinutesWatched += totalMinutes
      totalHoursWatched += totalHours

      // Adiciona o tempo assistido do vídeo à lista com o vídeo completo
      videoWatchTimes.push({ video, totalSeconds })
    })
  })

  // Calcula para vídeos que não estão em pastas
  videosWithoutFolders.forEach((video) => {
    const videoAnalytics = video.analytics
    const { viewTimestamps } = videoAnalytics

    const { totalMinutes, totalHours, totalSeconds } =
      calculateTotalWatchedTime(viewTimestamps)

    totalVideos += 1 // Incrementa total de vídeos
    totalMinutesWatched += totalMinutes
    totalHoursWatched += totalHours

    // Adiciona o tempo assistido do vídeo à lista com o vídeo completo
    videoWatchTimes.push({ video, totalSeconds })
  })

  // Remove vídeos duplicados baseando-se no videoId
  const uniqueVideos = Array.from(
    new Map(
      videoWatchTimes.map(({ video, totalSeconds }) => [
        video.id,
        { video, totalSeconds },
      ]),
    ).values(),
  )

  const topVideos = uniqueVideos
    .sort((a, b) => b.video.analytics.totalViews - a.video.analytics.totalViews)
    .slice(0, 3) // Pega os 3 vídeos mais assistidos

  return {
    totalVideos,
    totalMinutesWatched,
    totalHoursWatched,
    topVideos: topVideos.map(({ video }) => video), // Mapeia para retornar apenas os objetos Video
  }
}
