import { motion } from 'framer-motion'
import { useState } from 'react'
import type { Video } from '../../../types'
import { useLocation } from 'react-router-dom'
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

  const [video, setVideo] = useState<Video>(location.state.video)

  return (
    <section className="w-full max-h-screen mx-8 overflow-auto pr-4  pb-28">
      <HeaderFolder name="Teste" />

      <div className="flex w-full">
        <div className="w-full">
          <motion.header
            className="w-full flex items-center justify-between mt-10"
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <div>
              <span className="text-white text-lg flex items-start justify-start">
                <ArrowLeft size={24} className="mr-4 cursor-pointer" />
                Nome do vídeo
              </span>
              <span className="text-[#909090] text-sm mt-8">
                Edite aqui os detalhes do vídeo.
              </span>
            </div>
            <Button
              type="button"
              variant="danger"
              animation={true}
              variants={cardVariants}
              className="w-48 flex items-center justify-center py-3 px-4 h-10"
            >
              Analisar
            </Button>
          </motion.header>

          <motion.div
            className="w-full h-[40rem] mt-8"
            initial="hidden"
            animate="visible"
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