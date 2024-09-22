import type { FC } from 'react'
import { Steps } from './steps'

export const Register: FC = () => {
  return (
    <div className="w-full h-screen flex bg-[#121212]">
      <div className="w-[50%] h-screen bg-[#121212] flex items-center justify-center flex-col">
        <Steps />
      </div>
      <div className="w-[50%] h-screen bg-white"></div>
    </div>
  )
}
