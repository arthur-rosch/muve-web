import { useState } from 'react'
import { motion } from 'framer-motion'
import { CaretDown } from '@phosphor-icons/react'
import { itemVariants, menuVariants } from '../../animations'
import { Local } from '../../services/Local'
import { setUser } from '../../redux/actions/user'
import type { User } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import type { State } from '../../redux/store/configureStore'

export const AccordionMenuProfile = () => {
  const { user } = useSelector((state: State) => state.user)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = () => {
    Local.logout()
    dispatch(setUser({} as User))
    navigate('/login')
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-center gap-4">
        <button className="w-10 h-10 bg-[#1D1D1D] rounded-full text-[#777777] hover:text-white transactions-all">
          {user.name[0]}
        </button>
        <button
          className="text-white text-lg font-medium flex items-center justify-center gap-4"
          onClick={toggleMenu}
        >
          {user.name} <CaretDown />
        </button>
      </div>

      {isOpen && (
        <motion.div
          className="absolute top-12 right-0 mt-2 w-64 bg-[#1D1D1D] border-[1px] border-[#333333] border-solid shadow-lg"
          initial="hidden"
          animate="visible"
          variants={menuVariants}
        >
          <ul className="py-4">
            <motion.li
              className="px-4 py-2 hover:bg-[#333333] cursor-pointer text-white text-sm"
              variants={itemVariants}
              onClick={() => navigate('/profile')}
            >
              Meu Perfil
            </motion.li>
            <motion.li
              className="px-4 py-2 hover:bg-[#333333] cursor-pointer text-white text-sm"
              variants={itemVariants}
              onClick={() => navigate('/profile')}
            >
              Alterar Senha
            </motion.li>
            <motion.li
              className="px-4 py-2 hover:bg-[#333333] cursor-pointer text-white text-sm"
              variants={itemVariants}
              onClick={() => navigate('/profile')}
            >
              Meu plano
            </motion.li>
            <motion.li className="mx-4 my-4 border-b-[1px] border-[#333333] border-solid"></motion.li>
            <motion.li
              className="px-4 py-2 hover:bg-[#333333] cursor-pointer text-white text-sm"
              variants={itemVariants}
              onClick={handleLogout}
            >
              Sair
            </motion.li>
          </ul>
        </motion.div>
      )}
    </div>
  )
}

export default AccordionMenuProfile
