import logo from '../../assets/logo.svg'
import { useFolder } from '../../hooks'
import { motion } from 'framer-motion'
import { Button } from '../Ui/button'
import type { Folder, User } from '../../types'
import { useDispatch } from 'react-redux'
import { type FC, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom' // Import useLocation
import { listItensDelay } from '../../animations'
import {
  Gear,
  CaretUp,
  CaretDown,
  Newspaper,
  FolderOpen,
  Speedometer,
  ArrowUUpLeft,
  CaretDoubleLeft,
  ProjectorScreenChart,
} from '@phosphor-icons/react'
import { Local } from '../../services/Local'
import { setUser } from '../../redux/actions/user'

export const Sidebar: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const { getAllFolderByUserId } = useFolder()
  const { data: folders } = getAllFolderByUserId

  const [isSideBarOpen, setIsSideBarOpen] = useState(false)
  const [isFoldersOpen, setIsFoldersOpen] = useState<boolean>(false)

  const menuItems = [
    { id: 'dashboard', icon: <Speedometer size={20} />, label: 'Painel' },
    { id: 'folders', icon: <FolderOpen size={20} />, label: 'Pastas' },
    {
      id: 'analytics',
      icon: <ProjectorScreenChart size={20} />,
      label: 'Análise',
    },
    {
      id: 'https://ajuda.muveplayer.com/novidades/novidades-no-muve',
      icon: <Newspaper size={20} />,
      label: 'Novidades',
    },
  ]

  const otherItems = [
    { id: 'profile', icon: <Gear size={20} />, label: 'Configurações' },
    { id: 'logout', icon: <ArrowUUpLeft size={20} />, label: 'Sair da conta' },
  ]

  const handleLogout = () => {
    Local.logout()
    dispatch(setUser({} as User))
    navigate('/login')
  }

  const goToFolderPage = (folder: Folder) => {
    navigate('/folder', { state: { folder } })
  }

  return (
    <aside
      className={`h-screen ${isSideBarOpen ? 'w-80' : 'w-20'} rounded-xl flex flex-col items-start justify-start p-4 m-2 bg-[#1D1D1D] transition-width duration-300`}
    >
      <div className="w-full flex items-center justify-between border-b-[1px] border-[#333333] border-solid pb-6">
        <div className="flex items-center justify-center gap-4 text-white">
          {isSideBarOpen && (
            <img src={logo} alt="Muve Logo" className="w-32 h-w-32" />
          )}
        </div>
        <button
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          className="w-6 h-6 rounded flex items-center justify-center border-[1px] border-solid border-[#777777] text-[#777777] hover:bg-[#777777] hover:text-white transition-all"
        >
          <CaretDoubleLeft />
        </button>
      </div>

      <div className="w-full h-full my-6 flex flex-col">
        <span
          className={`text-sm text-[#909090] mb-6 ${!isSideBarOpen ? 'hidden' : ''}`}
        >
          Menu
        </span>
        <div className="flex flex-col gap-3">
          {menuItems.map((item) => {
            const isActive = location.pathname === `/${item.id}` // Check if the current route matches the item ID

            if (item.id === 'folders') {
              return (
                <div key={item.id}>
                  <Button
                    type="button"
                    variant="link"
                    key={item.id}
                    onClick={() => {
                      if (!isSideBarOpen) {
                        setIsSideBarOpen(true) // Open sidebar if closed
                      }
                      setIsFoldersOpen(!isFoldersOpen)
                    }}
                    className={`w-full p-4 flex gap-4 items-center justify-start h-12 ${isActive ? 'bg-[#333333] text-white' : ''}`}
                  >
                    <div className="flex gap-4 items-center">
                      {item.icon}
                      {isSideBarOpen && item.label}{' '}
                      {/* Show label only if sidebar is open */}
                    </div>
                    {isFoldersOpen && isSideBarOpen ? (
                      <CaretUp size={20} />
                    ) : (
                      <CaretDown size={20} />
                    )}
                  </Button>
                  {isFoldersOpen && isSideBarOpen && (
                    <motion.div
                      className="ml-8 mt-6 max-h-72 flex flex-col gap-2 overflow-x-auto"
                      initial="hidden"
                      animate="visible"
                    >
                      {folders &&
                        folders.map((folder, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center justify-between p-4 text-[#909090] hover:bg-[#343434] hover:text-white cursor-pointer rounded text-sm"
                            variants={listItensDelay}
                            custom={index}
                            onClick={() => goToFolderPage(folder)}
                          >
                            {folder.name}
                            <div className="w-5 h-5 flex items-center justify-center p-1 rounded-sm bg-[#343434] text-white text-xs font-medium">
                              {folder.videos.length}
                            </div>
                          </motion.div>
                        ))}
                    </motion.div>
                  )}
                </div>
              )
            }

            return (
              <Button
                type="button"
                variant="link"
                key={item.id}
                className={`w-full p-4 flex gap-4 items-center justify-start h-12 ${
                  isActive ? 'bg-[#333333] text-white' : ''
                }`}
                onClick={() => {
                  if (
                    item.id ===
                    'https://ajuda.muveplayer.com/novidades/novidades-no-muve'
                  ) {
                    window.open(item.id)
                  } else {
                    navigate(`/${item.id}`)
                  }
                }}
              >
                {item.icon}
                {isSideBarOpen && item.label}{' '}
                {/* Show label only if sidebar is open */}
              </Button>
            )
          })}
        </div>
      </div>

      <div className="w-full h-full my-6 flex flex-col">
        <span
          className={`text-sm text-[#909090] mb-6 ${!isSideBarOpen ? 'hidden' : ''}`}
        >
          Outros
        </span>
        <div className="flex flex-col gap-3">
          {otherItems.map((item) => {
            const isActive = location.pathname === `/${item.id}`
            return (
              <div
                key={item.id}
                className={`w-full p-4 flex gap-4 rounded items-center justify-start h-12 text-sm text-[#909090] ${isActive ? 'bg-[#333333] text-white' : ''} transition-all cursor-pointer`}
                onClick={() => {
                  if (item.id === 'logout') {
                    handleLogout()
                  } else if (item.id === 'https://ajuda.muveplayer.com/') {
                    window.location.href = item.id // Redirect to the help URL
                  } else {
                    navigate(`/${item.id}`)
                  }
                }}
              >
                {item.icon}
                {isSideBarOpen && item.label}{' '}
                {/* Show label only if sidebar is open */}
              </div>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
