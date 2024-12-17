import logo from '../../../assets/logo.svg'
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Form } from './components/form';
import { useEffect, useState } from 'react';
import { Button, TestimonialCarousel } from '@/components';
import { useLocation, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (!email) {
      navigate('/signup');
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [email, navigate]);

  const handleResendEmail = () => {
    setCountdown(60);
    toast.success('Código de verificação reenviado com sucesso!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] to-[#1E1E1E] flex">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8 flex items-center justify-center relative overflow-y-auto h-screen"
      >
        <div className="max-w-md w-full h-full space-y-6 sm:space-y-8 py-4">
          <div className="flex items-center space-x-2 w-32 sm:w-40 md:w-48">
            <img src={logo} alt="" className="w-full h-auto" />
          </div>

          <div className="text-center space-y-4 sm:space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto"
            >
              <Mail className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-primary" color='white' />
            </motion.div>

            <div className="space-y-1 sm:space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Verifique seu email</h2>
              <p className="text-sm sm:text-base text-gray-400">
                Digite o código de 6 dígitos enviado para{' '}
                <span className="text-white font-medium">{email}</span>
              </p>
            </div>

            <Form />

            <div className="bg-secondary/30 p-3 sm:p-4 rounded-lg backdrop-blur-sm">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5" color='white' />
                <div className="text-left">
                  <p className="text-xs sm:text-sm text-white font-medium">Não recebeu o código?</p>
                  <Button
                    type="button"
                    variant="link"
                    className="text-primary p-0 h-auto text-xs sm:text-sm hover:underline text-[#187BF0]"
                    onClick={handleResendEmail}
                    disabled={countdown > 0}
                  >
                    {countdown > 0
                      ? `Aguarde ${countdown}s para reenviar`
                      : 'Clique para reenviar o código'}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <Button
              type="button"
              variant="link"
              className="w-full text-sm sm:text-base"
              onClick={() => navigate('/login')}
            >
              <ArrowLeft className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Voltar para o login
            </Button>
          </div>

          <p className="text-center text-xs sm:text-sm text-gray-400">
            Problemas para verificar?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-primary hover:underline text-[#187BF0]"
            >
              Tente criar uma nova conta
            </button>
          </p>
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
  );
}