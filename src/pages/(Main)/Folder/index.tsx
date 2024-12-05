import { type FC, useState } from 'react'
import { motion } from 'framer-motion'
import { FolderArchive, ArrowLeft } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
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
    navigate(-1)
  }

  return (
    <section className="w-full h-full mx-8">
      <HeaderFolder name={folder.name} />

      <div className="w-full h-full max-h-screen flex flex-col mt-10 overflow-auto pb-96">
        <motion.header
          className="flex flex-col"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
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
          className="w-full mt-8"
          placeholder="Pesquisar vídeo"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {filteredVideos.length > 0 ? (
          <div className="h-full grid grid-cols-3 gap-6 mt-10  pr-4">
            {filteredVideos.map((video) => (
              <CardVideo
                key={video.id}
                video={video as Video}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full h-full flex flex-col items-center justify-center mt-12 gap-4"
          >
            <FolderArchive size={64} color="white" />
            <span className="text-white text-sm">
              {searchTerm ? 'Nenhum vídeo encontrado' : 'Sem vídeos criados'}
            </span>
          </motion.div>
        )}
      </div>
    </section>
  )
}
