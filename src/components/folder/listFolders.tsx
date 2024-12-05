import { Folder } from './folder'
import { motion } from 'framer-motion'
import { useState, type FC } from 'react'
import { FolderDashed } from '@phosphor-icons/react'
import { recentFolders } from '../../utils'
import { Button, CardVideo, Input } from '..'
import type { Folder as FolderType, Video } from '../../types'

interface ButtonData {
  id: string
  label: string
  count: number
}

interface ListFoldersProps {
  folders: FolderType[]
  videosNotFolderId: Video[]
}

const ListFolders: FC<ListFoldersProps> = ({
  folders,
  videosNotFolderId,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterButton, setFilterButton] = useState('1')

  const SevenDayRecentFolders = recentFolders(folders)
  const favoritesFolder = folders.filter((folder) => folder.favorite)

  const buttons: ButtonData[] = [
    { id: '1', label: 'Pastas', count: folders.length },
    { id: '2', label: 'Favoritos', count: favoritesFolder.length },
    { id: '3', label: 'Recentes', count: SevenDayRecentFolders.length },
    { id: '4', label: 'Vídeos', count: videosNotFolderId.length },
  ]

  const getFilteredFolders = () => {
    if (filterButton === '2') {
      return favoritesFolder
    }
    if (filterButton === '3') {
      return SevenDayRecentFolders
    }
    return folders
  }

  const filteredFolders = getFilteredFolders()

  // Filtragem por busca
  const searchedFolders = filteredFolders.filter((folder) =>
    folder.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Filtragem dos vídeos sem pastas, se o botão de vídeos estiver selecionado
  const displayedItems =
    filterButton === '4' ? videosNotFolderId : searchedFolders

  return (
    <motion.div className="flex flex-col w-full h-full mt-12"         initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}>
      <span
        className="text-white text-lg"
      >
        Todas as pastas
      </span>

      <div
        className="flex items-start justify-start mt-6 gap-4" 
      >
        {buttons.map((button) => (
          <Button
            key={button.id}
            type="button"
            variant="link"
            onClick={() => setFilterButton(button.id)}
            className={`flex items-center justify-center w-40 py-3 px-4 h-9 ${
              filterButton === button.id ? 'bg-[#333333] text-white' : ''
            }`}
          >
            {button.label} ( {button.count} )
          </Button>
        ))}
      </div>

      <Input
        type="text"
        value={searchTerm}
        className="w-full mt-8"
        placeholder="Pesquisar pasta"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {displayedItems && displayedItems.length > 0 ? (
        <div className="min-h-full max-h-[28rem] grid grid-cols-3 gap-6 mt-10 overflow-auto pb-96 pr-4">
          {filterButton === '4'
            ? displayedItems.map((video) => (
                <CardVideo
                  key={video.id}
                  video={video as Video}
                />
              ))
            : displayedItems.map((folder) => (
                <Folder key={folder.id} folder={folder as FolderType} />
              ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full h-full flex flex-col items-center justify-center mt-12 gap-4"
        >
          <FolderDashed size={64} color="white" />
          <span className="text-white text-sm">
            Sem pastas ou vídeos encontrados
          </span>
        </motion.div>
      )}
    </motion.div>
  )
}

export default ListFolders; 
