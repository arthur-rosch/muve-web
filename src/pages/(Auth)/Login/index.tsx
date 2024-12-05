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
    <div className="min-h-screen bg-gradient-to-br from-[#121212] to-[#1E1E1E] flex">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full lg:w-1/2 p-8 flex items-center justify-center"
      >
        <div className="w-full max-w-md space-y-8">
          <div className="flex items-center space-x-2 w-48 h-w-48">
            <img src={logo} alt="" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-white">Welcome back</h1>
            <p className="text-gray-400">Por favor, insira seus dados para fazer login.</p>
          </div>

          <Form setIsForgotPasswordOpen={setIsForgotPasswordOpen}/>
          
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
