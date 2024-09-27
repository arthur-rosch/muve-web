import folderImg from '../../../../../assets/pastamuve.png'
import type { FC } from 'react'
import { motion } from 'framer-motion'
import { Heart } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'
import { useFolder } from '../../../../../hooks'
import { cardVariants } from '../../../../../animations'
import { AccordionMenuFolder } from './accordionMenuFolder'
import type { Folder as FolderType } from '../../../../../types'

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
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <div className="w-full h-48 flex items-center justify-center bg-[#1D1D1D] relative">
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
          weight={folder.favorite ? 'fill' : 'regular'}
          color={folder.favorite ? '#187BF0' : 'white'}
          className="cursor-pointer"
          onClick={() => handleAddFavoriteFolder(folder.id, !folder.favorite)}
        />
      </div>
    </motion.div>
  )
}
