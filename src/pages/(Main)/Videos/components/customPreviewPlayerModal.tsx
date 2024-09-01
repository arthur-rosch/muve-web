import { type FC } from 'react'
import type { Video } from '../../../../types'
import {
  CustomModal,
  VslPreviewPlayer,
  CursePreviewPlayer,
} from '../../../../components'

interface CustomPreviewPlayerModalProps {
  video: Video
  isModalOpen: boolean
  setIsModalOpen: (value: boolean) => void
}

export const CustomPreviewPlayerModal: FC<CustomPreviewPlayerModalProps> = ({
  video,
  isModalOpen,
  setIsModalOpen,
}) => {
  return (
    <CustomModal.Root
      styles={'w-auto h-[50rem] p-6'}
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
    >
      <CustomModal.Title setIsOpen={setIsModalOpen} title="Preview do Player" />
      <div className="w-full h-full p-8">
        {video.type === 'Curso' ? (
          <CursePreviewPlayer video={video} />
        ) : (
          <VslPreviewPlayer video={video} />
        )}
      </div>
    </CustomModal.Root>
  )
}
