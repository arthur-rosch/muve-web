import { useState, type FC } from 'react'
import { Card } from '../../../../../../components'
import { CreateFolderModal } from './CreateFolderModal'
import { FolderSimplePlus } from '@phosphor-icons/react'
import { cardVariants } from '../../../../../../animations'
import type { Video } from '../../../../../../types'

interface CardCreateFolderProps {
  videosNotFolderId: Video[]
}

export const CardCreateFolder: FC<CardCreateFolderProps> = ({
  videosNotFolderId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Card
        animation={true}
        variant="primary"
        className="w-72 h-36 p-6 rounded-lg"
        variants={cardVariants}
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <FolderSimplePlus size={32} />
        <span className="hover:text-[#187BF0] text-lg">+ Nova pasta</span>
      </Card>
      <CreateFolderModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        videosNotFolderId={videosNotFolderId}
      />
    </>
  )
}
