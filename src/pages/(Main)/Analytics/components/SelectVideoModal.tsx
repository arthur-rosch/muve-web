import { motion } from 'framer-motion'
import { useState, useEffect, type FC } from 'react'
import type { Video } from '../../../../types'
import { FolderDashed } from '@phosphor-icons/react'
import { cardVariants, listItensDelay } from '../../../../animations'
import { Input, Button, CheckBox, CustomModal } from '../../../../components'

interface CreateFolderModalProps {
  videos: Video[]
  isModalOpen: boolean
  setIsModalOpen: (value: boolean) => void
  setSelectedVideo: (selectedVideo: Video | null) => void
}

export const SelectVideoModal: FC<CreateFolderModalProps> = ({
  videos,
  isModalOpen,
  setIsModalOpen,
  setSelectedVideo,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedVideo, setSelectedVideoState] = useState<Video | null>(null)

  const filteredVideos = videos.filter((video) =>
    video.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleVideoCheckedChange = (checked: boolean, video: Video) => {
    if (checked) {
      setSelectedVideoState(video)
    } else {
      setSelectedVideoState(null)
    }
  }

  useEffect(() => {
    setSelectedVideo(selectedVideo)
  }, [selectedVideo, setSelectedVideo])

  return (
    <CustomModal.Root
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      styles={'h-auto w-[50rem] flex flex-col m-auto'}
    >
      <CustomModal.Title
        title="+ Selecione o video"
        setIsOpen={setIsModalOpen}
        subTitle="Analise um video"
      />
      <>
        <div className="w-full max-h-[25rem] overflow-auto p-6">
          <div className="w-full flex flex-col gap-6">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="w-full flex flex-col"
            >
              <label htmlFor="videoIds" className="text-white text-sm">
                Lista de vídeos
              </label>
              <Input
                type="text"
                className="w-full h-10 mt-7"
                placeholder="Pesquisar vídeo"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </motion.div>
          </div>

          <div className="flex flex-col gap-2 mt-6">
            {filteredVideos && filteredVideos.length > 0 ? (
              filteredVideos.map((video, index) => (
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
                      className="w-28 h-14 rounded object-cover"
                      alt="thumbnail video"
                      src={video.thumbnail}
                    />
                    <div className="flex flex-col items-start justify-center gap-2">
                      <span className="text-white text-sm font-semibold">
                        {video.name}
                      </span>
                      <span className="text-[#909090] text-sm font-semibold">
                        {video.analytics.totalViews} views
                      </span>
                    </div>
                  </div>
                  <CheckBox
                    onCheckedChange={(checked) =>
                      handleVideoCheckedChange(checked, video)
                    }
                    checked={!!(selectedVideo && selectedVideo.id === video.id)}
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
                  Sem vídeos encontrados
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
            variants={cardVariants}
            className="w-full flex items-center justify-center py-3 px-4 h-10"
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            Confirmar
          </Button>
        </div>
      </>
    </CustomModal.Root>
  )
}
