import { type FC } from 'react'
import type { Video } from '../../types'
import { Input, CustomModal, VslPreviewPlayer, CursePreviewPlayer } from '../'

interface PreviewPlayerModalProps {
  video: Video
  isModalOpen: boolean
  setIsModalOpen: (value: boolean) => void
}

export const PreviewPlayerModal: FC<PreviewPlayerModalProps> = ({
  video,
  isModalOpen,
  setIsModalOpen,
}) => {
  return (
    <CustomModal.Root
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      styles={'h-[50rem] w-[50rem]'}
    >
      <CustomModal.Title
        title={video.name}
        setIsOpen={setIsModalOpen}
        subTitle={video.type}
      />

      <>
        <div className="min-w-full max-w-full max-h-full min-h-[35rem] p-6">
          {video.type === 'Vsl' ? (
            <VslPreviewPlayer video={video} key={video.id} />
          ) : (
            <CursePreviewPlayer video={video} key={video.id} />
          )}
        </div>
        <div className="w-full flex items-center justify-between py-6 px-8 border-t-[1px] border-solid border-[#333333]">
          <Input
            id="coverUrl"
            type="text"
            placeholder="https://imagem.com"
            className="w-full h-10"
          />
        </div>
      </>
    </CustomModal.Root>
  )
}
