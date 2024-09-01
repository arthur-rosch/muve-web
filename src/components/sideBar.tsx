import logo from '../assets/logo.svg'
import { type FC, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Video, House, CaretLeft, CaretDown } from '@phosphor-icons/react'

export const Sidebar: FC = () => {
  const [selected, setSelected] = useState<string>('home')

  const menuItems = [
    { id: 'home', icon: <House size={20} />, label: 'Painel' },
    { id: 'analytics', icon: <Video size={20} />, label: 'Análise' },
    // { id: 'settings1', icon: <Gear size={20} />, label: 'Novidades' },
    // { id: 'settings2', icon: <Gear size={20} />, label: 'Afiliação' },
    // { id: 'playlists', icon: <Gear size={20} />, label: 'Configurações' },
  ]

  return (
    <div className="flex flex-col items-start justify-between min-w-[10%] h-screen bg-[#101010] py-4">
      <div>
        <header className="w-full flex items-center justify-between text-white p-4">
          <img src={logo} alt="" className="w-[35px] h-[35px]" />
          <CaretLeft size={35} color="white" />
        </header>
        <nav className="flex flex-col w-full items-start p-8">
          {menuItems.map((item) => (
            <NavLink
              key={item.id}
              to={`/${item.id}`}
              onClick={() => setSelected(item.id)}
              className={`w-full flex items-center gap-2 text-[22px] font-medium mb-6 ${
                selected === item.id
                  ? 'bg-blue-500 text-white'
                  : 'text-white hover:text-blue-500'
              } p-2 rounded-md`}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <footer>
        <div className="flex items-center gap-2 p-4 w-full text-white hover:bg-blue-500 rounded-md cursor-pointer ml-2">
          <div className="w-14 h-14 bg-gray-300 rounded-full"></div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Nome</span>
            <span className="text-xs text-gray-400">Pessoa</span>
          </div>
          <CaretDown size={20} color="white" />
        </div>
      </footer>
    </div>
  )
}
