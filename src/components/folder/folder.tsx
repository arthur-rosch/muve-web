import folderImg from '@/assets/pastamuve.png'
 
import type { FC } from 'react'
import { useFolder } from '@/hooks'
import { Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import type { Folder as FolderType } from '../../types'
import { AccordionMenuFolder } from './accordionMenuFolder'

interface FolderProps {
  folder: FolderType
}

export const Folder: FC<FolderProps> = ({ folder }: FolderProps) => {
  const navigate = useNavigate()
  const { addFavoriteFolder, getAllFolderByUserId } = useFolder()

  const totalViews = folder.videos.reduce(
    (sum, video) => sum + video.analytics.totalViews,
    0,
  )

  const handleAddFavoriteFolder = async (folderId: string, value: boolean) => {
    const { success } = await addFavoriteFolder.mutateAsync({
      folderId,
      value,
    })

    if (success) {
      await getAllFolderByUserId.refetch()
    }
  }

  const goToFolderPage = () => {
    navigate('/folder', { state: { folder } })
  }

  return (
    <motion.div
      className="w-auto h-60 flex flex-col relative"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover="hover"
      whileTap="tap"
    >
      <div className="w-full h-48 flex items-center justify-center bg-[#1D1D1D] relative rounded">
        <img
          alt=""
          onClick={goToFolderPage}
          className="w-56 h-32 rounded cursor-pointer"
          src={folder.coverUrl ? folder.coverUrl : folderImg}
        />
        <div className="absolute top-2 right-2 cursor-pointer text-white">
          <AccordionMenuFolder folder={folder} />
        </div>
      </div>
      <div className="w-full flex items-center justify-between mt-4 text-[#909090]">
        <div className="flex-col flex items-start justify-start">
          <span className="text-[#DFDFDF] text-sm">{folder.name}</span>
          <span className="text-[#909090] text-sm">
            {folder.videos.length} vídeos | {totalViews} visualizações
          </span>
        </div>
        <Heart
          size={24}
          fill={folder.favorite ? '#187BF0' : ''}
          color={folder.favorite ? '#187BF0' : 'white'}
          className="cursor-pointer"
          onClick={() => handleAddFavoriteFolder(folder.id, !folder.favorite)}
        />
      </div>
    </motion.div>
  )
}
