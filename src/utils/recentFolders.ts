import type { Folder } from '../types'

export const recentFolders = (folders: Folder[]) => {
  const currentDate = new Date()

  const recent = folders.filter((folder) => {
    const folderCreatedAt = new Date(folder.created_at)
    const timeDifference = currentDate.getTime() - folderCreatedAt.getTime()
    const daysDifference = timeDifference / (1000 * 3600 * 24)
    return daysDifference <= 7
  })

  return recent
}
