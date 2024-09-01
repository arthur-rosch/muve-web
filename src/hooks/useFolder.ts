import type { Folder } from '../types'
import { useMutation, useQuery } from 'react-query'
import { FolderService } from './../services/FolderService'

export const useFolder = () => {
  const createFolder = useMutation(async ({ name }: { name: string }) => {
    const { data, success, error } = await FolderService.createFolder(name)

    return { data, success, error }
  })

  const getAllFolderByUserId = useQuery<Folder[]>(
    ['getAllFolderByUserId'],
    async () => {
      const { success, data, error } =
        await FolderService.getAllFolderByUserId()

      if (success) {
        return data.folders
      }

      throw error
    },
  )

  return {
    createFolder,
    getAllFolderByUserId,
  }
}
