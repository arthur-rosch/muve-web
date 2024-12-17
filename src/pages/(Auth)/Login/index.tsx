import logo from '@/assets/logo.svg'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Form } from './components/form';
import { TestimonialCarousel } from '@/components';
import { ForgotPasswordModal } from './components/forgot-password';
import { DivVariantes } from '@/animations';

export function Login() {
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  return (
    <div className="min-h-screen h-full bg-gradient-to-br from-[#121212] to-[#1E1E1E] flex">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8 relative overflow-y-auto flex items-center justify-center"
      >
        <div className="w-full max-w-md space-y-8 h-full flex items-center justify-center flex-col min-w-screen">
          <div className="flex items-center space-x-2 w-32 sm:w-40 md:w-48">
            <img src={logo} alt="" className="w-full h-auto" />
          </div>

          <div className="space-y-1 sm:space-y-2 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Welcome back
            </h1>
            <p className="text-sm sm:text-base text-gray-400">
              Por favor, insira seus dados para fazer login.
            </p>
          </div>

          <Form setIsForgotPasswordOpen={setIsForgotPasswordOpen} />

        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="hidden lg:block w-[70%] bg-[#1A1A1A] relative overflow-hidden"
      >

        <TestimonialCarousel />

      </motion.div>

      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
      />
    </div>
  );
}
