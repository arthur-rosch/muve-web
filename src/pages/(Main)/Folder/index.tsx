import { type FC, useState } from 'react'
import { motion } from 'framer-motion'
import { cardVariants } from '../../../animations'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, FolderDashed } from '@phosphor-icons/react'
import type { Folder as FolderType, Video } from '../../../types'
import { CardVideo, HeaderFolder, Input } from '../../../components'

export const Folder: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const folder = location.state?.folder as FolderType

  const [searchTerm, setSearchTerm] = useState('')

  if (!folder) {
    return <div>Carregando...</div>
  }

  const videos = folder.videos

  const filteredVideos = videos.filter((video) =>
    video.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const goBack = () => {
    navigate('/dashboard')
  }

  return (
    <section className="w-full h-full mx-8">
      <HeaderFolder name={folder.name} />

      <div className="w-full h-full flex flex-col mt-10">
        <motion.header
          className="flex flex-col"
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <span className="text-white text-lg flex items-start justify-start">
            <ArrowLeft
              size={24}
              className="mr-8 cursor-pointer"
              onClick={goBack}
            />
            {folder.name}
          </span>
          <span className="text-[#909090] text-sm mt-4">
            Todos os vídeos dentro da pasta
          </span>
        </motion.header>

        <Input
          type="text"
          animation={true}
          className="w-full mt-8"
          variants={cardVariants}
          placeholder="Pesquisar vídeo"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {filteredVideos.length > 0 ? (
          <div className="min-h-full max-h-[40rem] grid grid-cols-3 gap-6 mt-10 overflow-auto pb-20 pr-4">
            {filteredVideos.map((video) => (
              <CardVideo
                key={video.id}
                animation={true}
                video={video as Video}
                variant={cardVariants}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="w-full h-full flex flex-col items-center justify-center mt-12 gap-4"
          >
            <FolderDashed size={64} color="white" />
            <span className="text-white text-sm">
              {searchTerm ? 'Nenhum vídeo encontrado' : 'Sem vídeos criados'}
            </span>
          </motion.div>
        )}
      </div>
    </section>
  )
}
