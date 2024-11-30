import logo from '@/assets/logo.svg'
import { useFolder } from '@/hooks'
import { motion } from 'framer-motion'
import { Local } from '@/services/Local'
import { useState, type FC } from 'react'
import { useDispatch } from 'react-redux'
import type { Folder, User } from '@/types'
import { listItensDelay } from '@/animations'
import { setUser } from '@/redux/actions/user'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Settings,
  ChevronUp,
  ChevronDown,
  Newspaper,
  FolderOpen,
  LayoutDashboard,
  LogOut,
  BarChart3,
  ArrowRight,
  ArrowLeft
} from 'lucide-react'

import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,

  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,

  ScrollArea,
  Separator
} from '@/components'


export const Sidebar: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const { getAllFolderByUserId } = useFolder()
  const { data: folders } = getAllFolderByUserId

  const [isSideBarOpen, setIsSideBarOpen] = useState(false)
  const [isFoldersOpen, setIsFoldersOpen] = useState<boolean>(false)

  const menuItems = [
    { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Painel' },
    { id: 'folders', icon: <FolderOpen size={20} />, label: 'Pastas' },
    {
      id: 'analytics',
      icon: <BarChart3 size={20} />,
      label: 'Análise',
    },
    {
      id: 'https://ajuda.muveplayer.com/novidades/novidades-no-muve',
      icon: <Newspaper size={20} />,
      label: 'Novidades',
    },
  ]

  const otherItems = [
    { id: 'profile', icon: <Settings size={20} />, label: 'Configurações' },
    { id: 'logout', icon: <LogOut size={20} />, label: 'Sair da conta' },
  ]

  const handleLogout = () => {
    Local.logout()
    dispatch(setUser({} as User))
    navigate('/login')
  }

  const goToFolderPage = (folder: Folder) => {
    navigate('/folder', { state: { folder } })
  }

  const renderMenuItem = (item: typeof menuItems[0], isOtherItem = false) => {
    const isActive = location.pathname === `/${item.id}`
    const isExternalLink = item.id.startsWith('http')

    if (item.id === 'folders') {
      return (
        <Collapsible
          key={item.id}
          open={isFoldersOpen}
          onOpenChange={setIsFoldersOpen}
          onClick={() => setIsSideBarOpen(true)}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="link"
              className={`w-full justify-between h-10 px-3 text-zinc-400 hover:text-white hover:bg-zinc-800 ${
                isActive ? 'bg-zinc-800 text-white' : ''
              }`}
            >
              <span className="flex items-start gap-3">
                {item.icon}
                {isSideBarOpen && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </span>
              {isSideBarOpen && (isFoldersOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="px-1">
            {folders && folders.length > 0 && (
              <ScrollArea className="h-[300px] px-1">
                <motion.div
                  className="space-y-1 mt-1"
                  initial="hidden"
                  animate="visible"
                >
                  {folders.map((folder, index) => (
                    <motion.div
                      key={folder.id}
                      variants={listItensDelay}
                      custom={index}
                    >
                      <Button
                        variant="link"
                        size="sm"
                        className="w-full justify-between pl-9 font-normal text-zinc-400 hover:text-white hover:bg-zinc-800"
                        onClick={() => goToFolderPage(folder)}
                      >
                        {folder.name}
                        <span className="bg-zinc-800 text-zinc-300 rounded px-1.5 py-0.5 text-xs">
                          {folder.videos.length}
                        </span>
                      </Button>
                    </motion.div>
                  ))}
                </motion.div>
              </ScrollArea>
            )}
          </CollapsibleContent>
        </Collapsible>
      )
    }

    return (
      <TooltipProvider key={item.id}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="link"
              className={`w-full justify-between px-3 text-zinc-400 ${
                isActive ? 'bg-zinc-800 text-white' : ''
              }`}
              onClick={() => {
                if (isExternalLink) {
                  window.open(item.id)
                } else if (item.id === 'logout') {
                  handleLogout()
                } else {
                  navigate(`/${item.id}`)
                }
              }}
            >
              <div className='flex items-center justify-center'>
                {item.icon}
                {isSideBarOpen && (
                  <span className="ml-3 text-sm font-medium">{item.label}</span>
                )}
              </div>
            </Button>
          </TooltipTrigger>
          {!isSideBarOpen && (
            <TooltipContent side="right" className="font-medium bg-zinc-800 text-white border-zinc-700">
              {item.label}
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <aside
      className={`h-screen ${
        isSideBarOpen ? 'w-64' : 'w-16'
      } bg-[#1D1D1D] transition-all duration-300 p-2`}
      onMouseEnter={() => setIsSideBarOpen(true)}
      onMouseLeave={() => setIsSideBarOpen(false)}
    >
      <div className="flex h-full flex-col gap-2">
        <div className="flex items-center justify-between py-2 px-3">
          {isSideBarOpen && (
            <img src={logo} className="w-24 h-w-24"/>
          )}
          <button
            className="h-8 w-8 text-[#909090] hover:bg-[#333333] hover:text-white flex items-center justify-center rounded"
            onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          >
              {isSideBarOpen ? (
                <ArrowLeft className="h-4 w-4" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
          </button>
        </div>
        
        <Separator className="bg-zinc-800" />

        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => renderMenuItem(item))}
        </nav>

        <Separator className="bg-zinc-800" />

        <nav className="space-y-1">
          {otherItems.map((item) => renderMenuItem(item, true))}
        </nav>
      </div>
    </aside>
  )
}