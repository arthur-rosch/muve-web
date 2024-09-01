export const getYoutubeVideoId = (url: string) => {
  const urlParams = new URLSearchParams(new URL(url).search)
  return urlParams.get('v')
}
