export const setVideoTimeCookie = (videoId: string, time: number) => {
  document.cookie = `video-${videoId}-time=${time}; path=/;`
}
