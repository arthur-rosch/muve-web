import { motion } from 'framer-motion'
import type { Video } from '../../types'
import { useVideo } from '../../hooks'
import { useState, type FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { toastError, toastSuccess } from '../Ui/toast'
import { PreviewPlayerModal } from './previewPlayerModal'
import { DotsThreeOutlineVertical } from '@phosphor-icons/react'
import { itemVariants, menuVariants } from '../../animations'

interface AccordionMenuVideoProps {
  video: Video
}

export const AccordionMenuVideo: FC<AccordionMenuVideoProps> = ({ video }) => {
  const navigate = useNavigate()
  const { deleteVideo, getAllVideosByUserId } = useVideo()

  const [isOpen, setIsOpen] = useState(false)
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleAnalytics = () => {
    toggleMenu()
    navigate('/analytics', { state: { videoUrl: video.url } })
  }

  const handleDeleteVideo = async () => {
    const { success } = await deleteVideo.mutateAsync(video.id)

    if (success) {
      toggleMenu()
      navigate('/dashboard')
      toastSuccess({
        text: `Vídeo excluído com sucesso`,
      })

      await getAllVideosByUserId.refetch()
    } else {
      toastError({
        text: `Algo deu errado, tente mais tarde`,
      })
    }
  }

  return (
    <>
      <div className="relative">
        <button
          className="absolute top-2 right-2 text-white cursor-pointer"
          onClick={toggleMenu}
        >
          <DotsThreeOutlineVertical weight="fill" size={24} />
        </button>

        {isOpen && (
          <motion.div
            className="absolute top-10 right-0 mt-2 w-40 bg-[#1D1D1D] border-[1px] border-[#333333] border-solid shadow-lg"
            initial="hidden"
            animate="visible"
            variants={menuVariants}
          >
            <ul className="py-2">
              <motion.li
                onClick={() => {
                  setIsPreviewModalOpen(!isPreviewModalOpen)
                  toggleMenu()
                }}
                className="px-4 py-2 hover:bg-[#333333] cursor-pointer text-white text-sm"
                variants={itemVariants}
              >
                Preview
              </motion.li>
              <motion.li
                onClick={handleDeleteVideo}
                className="px-4 py-2 hover:bg-[#333333] cursor-pointer text-white text-sm"
                variants={itemVariants}
              >
                Delete
              </motion.li>
              <motion.li
                onClick={handleAnalytics}
                className="px-4 py-2 hover:bg-[#333333] cursor-pointer text-white text-sm"
                variants={itemVariants}
              >
                Analytics
              </motion.li>
            </ul>
          </motion.div>
        )}
      </div>
      <PreviewPlayerModal
        isModalOpen={isPreviewModalOpen}
        setIsModalOpen={setIsPreviewModalOpen}
        video={video}
      />
    </>
  )
}