export const getVideoTimeFromCookie = (videoId: string): number | null => {
  const match = document.cookie.match(
    new RegExp(`(^| )video-${videoId}-time=([^;]+)`),
  )
  return match ? Number(match[2]) : null
}