import { useMutation, useQuery } from 'react-query'
import { AnalyticsService } from './../services/AnalyticsService'
import type { AddViewTimestamps, AddViewUnique, VideoAnalytics } from '../types'

export const useAnalytics = (videoId: string) => {
  const addViewTimestamps = useMutation(async (view: AddViewTimestamps) => {
    const { data, success, error } =
      await AnalyticsService.addViewTimesTamps(view)

    return { data, success, error }
  })

  const addViewUnique = useMutation(async (view: AddViewUnique) => {
    const { data, success, error } = await AnalyticsService.addViewUnique(view)

    return { data, success, error }
  })

  const getAnalyticsByVideoId = useQuery<VideoAnalytics>(
    ['getAnalyticsByVideoId'],
    async () => {
      console.log(videoId)
      const { success, data, error } =
        await AnalyticsService.getAnalyticsByVideoId(videoId)

      if (success) {
        console.log(data)

        return data.analytics
      }

      throw error
    },
  )

  return {
    addViewUnique,
    addViewTimestamps,
    getAnalyticsByVideoId,
  }
}
