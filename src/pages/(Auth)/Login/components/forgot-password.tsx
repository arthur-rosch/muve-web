import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { formVariants } from '@/animations';
import { Mail, ArrowRight, X } from 'lucide-react';
import { Button, Input, Modal } from '@/components';
import { zodResolver } from '@hookform/resolvers/zod';
import { ForgotPasswordSchema, type ForgotPasswordFormData } from '@/validation';
import { toast } from 'sonner';
import { useAuth } from '@/hooks';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ForgotPasswordModal({ isOpen, onClose }: ForgotPasswordModalProps) {
  const { generatePasswordResetToken } = useAuth()

  const [email, setEmail] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setEmail(data.email);
    setIsLoading(true);
    
    const { success } = await generatePasswordResetToken.mutateAsync(data.email).finally(() => setIsLoading(false))

    setIsSuccess(success)

    reset()
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setIsSuccess(false);
      reset();
    }, 300);
  };

  const handleResendEmail = async () => {
    setCountdown(60);
    setIsLoading(true);
    
    const { success } = await generatePasswordResetToken.mutateAsync(email).finally(() => setIsLoading(false))

    if (success) {
      setEmail('')
    }
    
    setIsSuccess(success)
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className='max-w-md'>
      <motion.div className="relative"         initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}>
        <button
          onClick={handleClose}
          className="absolute right-0 top-0 text-gray-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center space-y-4 mb-6">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Mail className="h-12 w-12 text-primary" color='white'/>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">
              {isSuccess ? 'Verifique seu e-mail' : 'Esqueceu a senha?'}
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              {isSuccess
                  ? 'Enviamos um link para redefinir sua senha'
                  : 'Sem problemas, enviaremos as instruções de redefinição'
              }
            </p>
          </div>
        </div>

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Button
              type="button"
              className="w-full"
              onClick={handleClose}
            >
              Voltar e fazer login
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-center text-sm text-gray-400">
              Não recebeu o email?{' '}
              <button
                disabled={countdown > 0}
                onClick={handleResendEmail}
                className="text-primary hover:underline"
              >
                {countdown > 0
                  ? `Aguarde ${countdown}s para reenviar`
                  : 'Clique para reenviar o código'
                }
              </button>
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">
                Email
              </label>
              <Input
                {...register('email')}
                type="email"
                placeholder="jhon@example.com"
                error={!!errors.email}
                variant="filled"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
            >
              Recuperar senha
            </Button>

            <Button
              type="button"
              variant="link"
              className="w-full"
              onClick={handleClose}
            >
              Voltar para tela de login
            </Button>
          </motion.form>
        )}
      </motion.div>
    </Modal>
  );
}