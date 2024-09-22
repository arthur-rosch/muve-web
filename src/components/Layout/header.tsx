import { Bell, Gear } from '@phosphor-icons/react'
import AccordionMenuProfile from './AccordionMenuProfile'
import { useNavigate } from 'react-router-dom'

export const Header = () => {
  const navigate = useNavigate()

  const goPageProfile = () => {
    navigate('/profile')
  }

  return (
    <header className="w-full flex items-center justify-between mt-9 px-10 border-b-[1px] border-[#333333] border-solid pb-4">
      <span className="text-white text-2xl font-semibold">
        Bem-vindo ao Muve.
      </span>
      <div className="flex items-center justify-center gap-4">
        <button
          className="w-7 h-7 flex items-center justify-center bg-[#1D1D1D] rounded-full text-[#777777] hover:text-white transactions-all"
          onClick={goPageProfile}
        >
          <Gear size={14} />
        </button>
        <button className="w-7 h-7 flex items-center justify-center bg-[#1D1D1D] rounded-full text-[#777777] hover:text-white transactions-all">
          <Bell size={14} />
        </button>
        <AccordionMenuProfile />
      </div>
    </header>
  )
}
