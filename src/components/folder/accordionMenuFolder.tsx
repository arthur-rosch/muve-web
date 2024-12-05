import { motion } from 'framer-motion'
import { useState, type FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { FolderOpen, Trash } from 'lucide-react'
import { DotsThreeOutlineVertical } from '@phosphor-icons/react'

import { useFolder } from '@/hooks'
import type { Folder } from '@/types'
import { itemVariants, menuVariants } from '@/animations'



interface AccordionMenuFolderProps {
  folder: Folder
}

export const AccordionMenuFolder: FC<AccordionMenuFolderProps> = ({
  folder,
}) => {
  const navigate = useNavigate()
  const { deleteFolder, getAllFolderByUserId } = useFolder()

  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleDeleteFolder = async () => {
    await deleteFolder.mutateAsync(folder.id)
    await getAllFolderByUserId.refetch()
  }

  const handleOpenFolder = async () => {
   navigate('/folder', { state: { folder } })
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
            className="absolute top-10 right-0 mt-2 w-40 bg-[#1D1D1D] border-[1px] border-[#333333] border-solid shadow-lg rounded"
            initial="hidden"
            animate="visible"
            variants={menuVariants}
          >
            <ul className="py-2">
              <motion.li
                onClick={handleOpenFolder}
                className="px-4 py-2 hover:bg-[#333333] cursor-pointer text-white text-sm flex items-start justify-start gap-2"
                variants={itemVariants}
              >
                <FolderOpen size={22} color="#707070"/> Abrir
              </motion.li>
              <motion.li
                onClick={handleDeleteFolder}
                className="px-4 py-2 hover:bg-[#333333] cursor-pointer text-white text-sm flex items-start justify-start gap-2"
                variants={itemVariants}
              >
                <Trash size={22} color="red"/> Deletar
              </motion.li>
            </ul>
          </motion.div>
        )}
      </div>
    </>
  )
}
