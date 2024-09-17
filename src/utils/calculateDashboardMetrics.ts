import type { ViewTimestamp, Folder, Video } from '../types'

const convertSecondsToMinutes = (seconds: number) => seconds / 60
const convertSecondsToHours = (seconds: number) => seconds / 3600

const calculateTotalWatchedTime = (viewTimestamps: ViewTimestamp[]) => {
  let totalSeconds = 0
  console.log(viewTimestamps)
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

// Função para calcular métricas de pasta e top 3 vídeos mais assistidos
export const calculateDashboardMetrics = (folders: Folder[]) => {
  console.log(folders)
  let totalVideos = 0
  let totalMinutesWatched = 0
  let totalHoursWatched = 0
  const videoWatchTimes: { video: Video; totalSeconds: number }[] = []

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

  // Ordena os vídeos pelo tempo assistido em ordem decrescente
  const topVideos = videoWatchTimes
    .sort((a, b) => b.totalSeconds - a.totalSeconds)
    .slice(0, 3) // Pega os 3 vídeos mais assistidos

  return {
    totalVideos,
    totalMinutesWatched,
    totalHoursWatched,
    topVideos: topVideos.map(({ video }) => video), // Mapeia para retornar apenas os objetos Video
  }
}
