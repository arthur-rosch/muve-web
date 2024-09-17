import { motion } from 'framer-motion'
import { useState, type FC } from 'react'
import type { Folder } from '../../../../../types'
import { useFolder } from '../../../../../hooks'
import { DotsThreeOutlineVertical } from '@phosphor-icons/react'
import { toastError, toastSuccess } from '../../../../../components'
import { itemVariants, menuVariants } from '../../../../../animations'

interface AccordionMenuFolderProps {
  folder: Folder
}

export const AccordionMenuFolder: FC<AccordionMenuFolderProps> = ({
  folder,
}) => {
  const { deleteFolder, getAllFolderByUserId } = useFolder()

  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleDeleteFolder = async () => {
    const { success } = await deleteFolder.mutateAsync(folder.id)

    if (success) {
      toastSuccess({
        text: `Pasta excluída com sucesso`,
      })

      await getAllFolderByUserId.refetch()
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
                onClick={handleDeleteFolder}
                className="px-4 py-2 hover:bg-[#333333] cursor-pointer text-white text-sm"
                variants={itemVariants}
              >
                Delete
              </motion.li>
            </ul>
          </motion.div>
        )}
      </div>
    </>
  )
}
