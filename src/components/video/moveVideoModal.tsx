import { motion } from 'framer-motion'
import { useFolder, useVideo } from '../../hooks'
import type { Video } from '../../types'
import { useState, type FC } from 'react'
import { FolderDashed } from '@phosphor-icons/react'
import coverFolder from '../../assets/pastamuve.png'
import { cardVariants, listItensDelay } from '../../animations'
import {
  Button,
  CheckBox,
  CustomModal,
  toastError,
  toastSuccess,
} from '..'

interface MoveVideoModalProps {
  video: Video
  isModalOpen: boolean
  setIsModalOpen: (value: boolean) => void
}

export const MoveVideoModal: FC<MoveVideoModalProps> = ({
  video,
  isModalOpen,
  setIsModalOpen, 
}) => {
  const { ediFolderIdVideo } = useVideo()
  const { getAllFolderByUserId } = useFolder()
  const { data: allFolders } = getAllFolderByUserId

  const [selectedFolderId, setSelectedFolderId] = useState<string | undefined>(video.folderId)

  const onSubmit = async () => {
    if (selectedFolderId && video.folderId !== selectedFolderId) {
      const { success } = await ediFolderIdVideo.mutateAsync({
        videoId: video.id,
        folderId: selectedFolderId
      })
      
      if (success) {
        setIsModalOpen(false)
        toastSuccess({
          text: `Vídeo movido com sucesso`,
        })
      } else { 
        toastError({
          text: 'Ops... Algo deu errado',
        })
      }
    }
  }

  return (
    <CustomModal.Root
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      styles={'h-auto w-[50rem] flex flex-col m-auto'}
    >
      <CustomModal.Title
        title="+ Mover video"
        setIsOpen={setIsModalOpen}
        subTitle="Seleciona a pasta para mover o video"
      />
      <>
        <div className="w-full max-h-[25rem] overflow-auto p-6">
          <div className="flex flex-col gap-2 mt-6">
            {allFolders && allFolders?.length > 0 ? (
              allFolders.map((folder, index) => (
                <motion.div
                  key={index}
                  className="w-full mt-6 flex border-b-[1px] border-[#333333] pb-4 gap-4 items-center justify-between"
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={listItensDelay}
                >
                  <div className="flex gap-4">
                    <img
                      className="w-28 h-14 rounded"
                      alt="thumbnail folder"
                      src={folder.coverUrl ? folder.coverUrl : coverFolder}
                    />
                    <div className="flex flex-col items-start justify-center gap-2">
                      <span className="text-white text-sm font-semibold">
                        {folder.name}
                      </span>
                      <span className="text-[#909090] text-sm font-semibold">
                        {folder.videos.length} videos
                      </span>
                    </div>
                  </div>
                  <CheckBox
                    checked={selectedFolderId === folder.id} // Comparar com a pasta selecionada
                    onCheckedChange={() => setSelectedFolderId(folder.id)} // Atualizar a pasta selecionada
                  />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className="w-full h-full flex flex-col items-center justify-center mt-6 gap-4"
              >
                <FolderDashed size={44} color="white" />
                <span className="text-white text-sm">
                  Sem pastas criadas
                </span>
              </motion.div>
            )}
          </div>
        </div>
        <div className="w-full gap-12 flex items-center justify-between py-6 px-8 border-t-[1px] border-solid border-[#333333]">
          <Button
            type="button"
            variant="danger"
            animation={true}
            variants={cardVariants}
            onClick={() => setIsModalOpen(false)}
            className="w-full flex items-center justify-center py-3 px-4 h-10"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="primary"
            animation={true}
            onClick={onSubmit}
            variants={cardVariants}
            className="w-full flex items-center justify-center py-3 px-4 h-10"
          >
            Confirmar
          </Button>
        </div>
      </>
    </CustomModal.Root>
  )
}
