import { motion } from 'framer-motion'
import { useState } from 'react'
import type { Video } from '../../../types'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft } from '@phosphor-icons/react'
import { cardVariants } from '../../../animations'
import { ConfigMenuVsl, ConfigMenuCurse } from './components'
import {
  Button,
  CursePreviewPlayer,
  HeaderFolder,
  VslPreviewPlayer,
} from '../../../components'

export const EditVideo = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1) // Volta para a página anterior
  }

  const handleAnalytics = () => {
    navigate('/analytics', { state: { video } })
  }

  const [video, setVideo] = useState<Video>(location.state.video)

  return (
    <section className="w-full max-h-screen mx-8 overflow-auto pr-4 pb-28">
      <HeaderFolder name={video.name} />

      <div className="flex w-full max-h-[40rem]">
        <div className="w-full">
          <motion.header
            className="w-full flex items-center justify-between mt-10"
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <div>
              <span className="text-white text-lg flex items-start justify-start">
                <ArrowLeft
                  size={24}
                  className="mr-4 cursor-pointer"
                  onClick={goBack}
                />
                {video.name}
              </span>
              <span className="text-[#909090] text-sm mt-8">
                Edite aqui os detalhes do vídeo.
              </span>
            </div>
            <Button
              type="button"
              variant="danger"
              onClick={handleAnalytics}
              className="w-48 flex items-center justify-center py-3 px-4 h-10"
            >
              Analisar
            </Button>
          </motion.header>

          <motion.div
            className={`w-full max-h-[40rem] mt-8`}
            initial="hidden"
            animate="visible"
            style={{ aspectRatio: video.format }}
            variants={cardVariants}
          >
            {video.type === 'Curso' ? (
              <CursePreviewPlayer video={video} key={video.id} />
            ) : (
              <VslPreviewPlayer video={video} key={video.id} />
            )}
          </motion.div>
        </div>
        {video.type === 'Curso' ? (
          <ConfigMenuCurse video={video} setVideo={setVideo} />
        ) : (
          <ConfigMenuVsl video={video} setVideo={setVideo} />
        )}
      </div>
    </section>
  )
}
