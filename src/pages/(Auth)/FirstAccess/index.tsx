import { type FC } from 'react'
import logo from '@/assets/logo.svg'
import { motion } from 'framer-motion'
import { Form } from './components/form'
import { TestimonialCarousel } from '@components/index'


export const FirstAccess: FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] to-[#1E1E1E] flex overflow-auto">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8 relative overflow-y-auto flex items-center justify-center"
      >
        <div className="w-full max-w-md space-y-8 flex items-center justify-center flex-col max-h-screen">
          <div className="flex items-center space-x-2 w-32 sm:w-40 md:w-48">
            <img src={logo} alt="" className="w-full h-auto" />
          </div>

          <div className="space-y-1 sm:space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Vamos pedir isso apenas uma vez, juro! 😄
            </h1>
            <p className="text-gray-400">
              Escolha suas preferências para acessar sua conta
            </p>
          </div>

          <Form />

        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="hidden lg:block w-[70%] bg-[#1A1A1A] relative overflow-hidden"
      >
        <TestimonialCarousel />
      </motion.div>
    </div>
  )
}