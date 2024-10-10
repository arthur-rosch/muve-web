import { useMutation, useQuery } from 'react-query'
import { VideoService } from './../services/VideoService'
import type {
  CreateVideoVariables,
  EditPlayerVideoProps,
  Video,
} from '../types'

export const useVideo = () => {
  const createVideo = useMutation(async (video: CreateVideoVariables) => {
    const { data, success, error } = await VideoService.createVideo(video)

    return { data, success, error }
  })

  const editPlayerVideo = useMutation(
    async ({
      dataEdit,
      videoId,
    }: {
      dataEdit: EditPlayerVideoProps
      videoId: string
    }) => {
      const { data, success, error } = await VideoService.editPlayerVideo(
        videoId,
        dataEdit,
      )

      return { data, success, error }
    },
  )

  const deleteVideo = useMutation(async (videoId: string) => {
    const { data, success, error } = await VideoService.deleteVideo(videoId)

    return { data, success, error }
  })

  const getAllVideosByUserId = useQuery<Video[]>(
    ['getAllVideosByUserId'],
    async () => {
      const { success, data, error } = await VideoService.getAllVideosByUserId()

      if (success) {
        return data.videos
      }

      throw error
    },
  )

  const getManyVideosNotFolderId = useQuery<Video[]>(
    ['getManyVideosNotFolderId'],
    async () => {
      const { success, data, error } =
        await VideoService.getManyVideosNotFolderId()

      if (success) {
        return data.videos
      }

      throw error
    },
  )

  const getVideoById = useMutation(async (videoId: string) => {
    const { success, data, error } = await VideoService.getVideoById(videoId)

    return { data, success, error }
  })

  return {
    createVideo,
    deleteVideo,
    getVideoById,
    editPlayerVideo,
    getAllVideosByUserId,
    getManyVideosNotFolderId,
  }
}
