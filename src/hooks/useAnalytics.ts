import { useMutation } from 'react-query'
import { AnalyticsService } from './../services/AnalyticsService'
import type { AddViewTimestamps, AddViewUnique } from '../types'

export const useAnalytics = () => {
  const addViewTimestamps = useMutation(async (view: AddViewTimestamps) => {
    const { data, success, error } =
      await AnalyticsService.addViewTimesTamps(view)

    return { data, success, error }
  })

  const addViewUnique = useMutation(async (view: AddViewUnique) => {
    const { data, success, error } = await AnalyticsService.addViewUnique(view)

    return { data, success, error }
  })

  return {
    addViewUnique,
    addViewTimestamps,
  }
}
