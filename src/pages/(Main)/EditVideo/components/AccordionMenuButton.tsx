import { motion } from 'framer-motion'
import { useState, type FC } from 'react'
import type { VideoButton } from '../../../../types'
import { itemVariants, menuVariants } from '../../../../animations'
import {
  DotsThreeOutlineVertical,
  PencilSimple,
  Trash,
} from '@phosphor-icons/react'

interface AccordionMenuButtonProps {
  index: number
  button: VideoButton
  handleDeleted: (index: number) => void
  setIsEditButton: ({
    button,
    index,
  }: {
    button: VideoButton
    index: number
  }) => void
  setIsModalOpen: (value: boolean) => void
}

export const AccordionMenuButton: FC<AccordionMenuButtonProps> = ({
  handleDeleted,
  button,
  index,
  setIsModalOpen,
  setIsEditButton,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleDeleteChapter = async () => {
    handleDeleted(index)
  }

  return (
    <>
      <div className="relative">
        <button
          type="button"
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
                  setIsEditButton({
                    button,
                    index,
                  })
                  setIsModalOpen(true)
                }}
                className="px-4 py-2 hover:bg-[#333333] cursor-pointer text-white text-sm flex items-start justify-start gap-2"
                variants={itemVariants}
              >
                <PencilSimple size={22} color="#707070" />
                Editar
              </motion.li>
              <motion.li
                onClick={handleDeleteChapter}
                className="px-4 py-2 hover:bg-[#333333] cursor-pointer text-white text-sm flex items-start justify-start gap-2"
                variants={itemVariants}
              >
                <Trash size={22} color="red" /> Deletar
              </motion.li>
            </ul>
          </motion.div>
        )}
      </div>
    </>
  )
}