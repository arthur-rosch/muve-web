import { toast } from 'sonner'
import { useSelector } from 'react-redux';
import { handleError } from './handle-error'
import { useUpgradeModal } from './useUpgradeModal'
import { VideoService } from './../services/VideoService'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { CreateVideoVariables, Video, EditPlayerVideoProps } from '@/types'
import type { State } from '@/redux/store/configureStore';

export const useVideo = (getByVideoId?: string) => {
  const { onOpen } = useUpgradeModal();
  const { user } = useSelector((state: State) => state.user)

  const createVideo = useMutation({
    mutationFn: async (video: CreateVideoVariables) => {
      return await VideoService.createVideo(video)
    },
    onSuccess: (response) => {
      if (response.success && response.data) {
        toast.success('Vídeo criado com sucesso!')
      } if (response.error?.message === 'Video limit exceeded.') {
        handleError(response.error?.message!);
        onOpen(user.email)
      }
      else {
        handleError(response.error?.message || 'Erro ao criar vídeo.')
      }
    },
    onError: (error) => {
      handleError(error?.message || 'Erro ao criar vídeo.')
    }
  })

  const editPlayerVideo = useMutation({
    mutationFn: async ({ dataEdit, videoId }: { dataEdit: EditPlayerVideoProps, videoId: string }) => {
      return await VideoService.editPlayerVideo(videoId, dataEdit)
    },
    onSuccess: ({ success, data, error }) => {
      if (success && data) {
        toast.success('Vídeo editado com sucesso!')
      } else {
        handleError(error?.message || 'Erro ao editar vídeo.')
      }
    },
    onError: (error) => {
      handleError(error?.message || 'Erro ao editar vídeo.')
    }
  })

  const deleteVideo = useMutation({
    mutationFn: async (videoId: string) => {
      return await VideoService.deleteVideo(videoId)
    },
    onSuccess: ({ success, data, error }) => {
      if (success && data) {
        toast.success('Vídeo excluído com sucesso!')
      } else {
        handleError(error?.message || 'Erro ao excluir vídeo.')
      }
    },
    onError: (error) => {
      handleError(error?.message || 'Erro ao excluir vídeo.')
    }
  })

  
  const getAllVideosByUserId = (enabled: boolean) =>
  useQuery<Video[], Error>({
    queryKey: ['getAllVideosByUserId'],
    queryFn: async () => {
      const { success, data, error } = await VideoService.getAllVideosByUserId()
      if (success) {
        return data.videos
      }
      handleError(error?.message || 'Erro ao buscar')
      throw error
    },
    enabled,
  })

  const getManyVideosNotFolderId = (enabled: boolean) =>
    useQuery<Video[], Error>({
      queryKey: ['getManyVideosNotFolderId'],
      queryFn: async () => {
        const { success, data, error } = await VideoService.getManyVideosNotFolderId()
        if (success) {
          return data.videos
        }
        handleError(error?.message || 'Erro ao buscar vídeos.')
        throw error
      },
      enabled,
  })

  const getVideoById = (enabled: boolean, getByVideoId: string | null) =>
    useQuery<Video, Error>({
      queryKey: ['getVideoById', getByVideoId],
      queryFn: async () => {
        if (!getByVideoId) throw new Error('Video ID is required')
        const { success, data, error } = await VideoService.getVideoById(getByVideoId)
        if (success) {
          return data
        }
        handleError(error?.message || 'Erro ao buscar vídeo.')
        throw error
      },
      enabled: enabled && !!getByVideoId,
  })

  const ediFolderIdVideo = useMutation({
    mutationFn: async ({ folderId, videoId }: { folderId: string, videoId: string }) => {
      return await VideoService.ediFolderIdVideo(videoId, folderId)
    },
    onSuccess: ({ success, data, error }) => {
      if (success && data) {
        toast.success('Pasta do vídeo atualizada com sucesso!')
      } else {
        handleError(error?.message || 'Erro ao atualizar pasta do vídeo.')
      }
    },
    onError: (error) => {
      handleError(error?.message || 'Erro ao atualizar pasta do vídeo.')
    }
  })

  return {
    createVideo,
    deleteVideo,
    getVideoById,
    editPlayerVideo,
    ediFolderIdVideo,
    getAllVideosByUserId,
    getManyVideosNotFolderId,
  }
}
