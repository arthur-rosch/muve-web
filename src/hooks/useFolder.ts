import type { CreateFolderVariables, Folder } from '../types'
import { useMutation, useQuery } from 'react-query'
import { FolderService } from './../services/FolderService'

export const useFolder = () => {
  const createFolder = useMutation(async (folder: CreateFolderVariables) => {
    const { data, success, error } = await FolderService.createFolder(folder)

    return { data, success, error }
  })

  const deleteFolder = useMutation(async (folderId: string) => {
    const { data, success, error } = await FolderService.deleteFolder(folderId)

    return { data, success, error }
  })

  const addFavoriteFolder = useMutation(
    async ({ folderId, value }: { folderId: string; value: boolean }) => {
      const { data, success, error } = await FolderService.addFavoriteFolder(
        folderId,
        value,
      )

      return { data, success, error }
    },
  )

  const getAllFolderByUserId = useQuery<Folder[]>(
    ['getAllFolderByUserId'],
    async () => {
      const { success, data, error } =
        await FolderService.getAllFolderByUserId()
      console.log(success, data, error)
      if (success) {
        return data.folders
      }

      throw error
    },
  )

  return {
    createFolder,
    deleteFolder,
    addFavoriteFolder,
    getAllFolderByUserId,
  }
}
