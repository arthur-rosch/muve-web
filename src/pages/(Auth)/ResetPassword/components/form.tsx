import { toast } from 'sonner'
import { useState } from 'react'
import { useAuth } from '@/hooks'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'
import { formVariants } from '@/animations'
import { Button, Input  } from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocation, useNavigate } from 'react-router-dom'
import { resetPasswordSchema, type ResetPasswordInputs } from '@/validation'

export const Form = () => {
  const location = useLocation()
  const { forgotPassword } = useAuth()

  const [isLoading, setIsLoading] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  

  const queryParams = new URLSearchParams(location.search)
  const token = queryParams.get('token')

    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInputs>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const handlePasswordReset = async ({
    newPassword,
    confirmNewPassword,
  }: ResetPasswordInputs) => {
    setIsLoading(true)

    await forgotPassword.mutateAsync({
        newPassword,
        confirmNewPassword,
        token: token!,
    }).finally(() => setIsLoading(false))
  }

  const inputs = [
    {
      id: "newPassword",
      label: "Nova senha",
      error: errors.newPassword,      
      placeholder: "Digite sua nova senha",
      type: showNewPassword ? "text" : "password",
      className: "bg-[#2A2A2A] border-[#3A3A3A] text-white placeholder:text-gray-500",
      isPassword: true,
    },
    {
      id: "confirmNewPassword",
      label: "Confirmar Nova Senha",
      type: showConfirmPassword ? "text" : "password",
      placeholder: "••••••••",
      error: errors.confirmNewPassword,
      className: "bg-[#2A2A2A] border-[#3A3A3A] text-white placeholder:text-gray-500 pr-10",
      isPassword: true,
    },
  ];

  return (
          <motion.form       initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit(handlePasswordReset)} className="space-y-6">
          {inputs.map(({ id, label, type, placeholder, error, className, isPassword }) => (
              <div key={id} className="space-y-2">
                <label className="text-sm font-medium text-gray-200">{label}</label>
                <div className="relative">
                  <Input
                    {...register(id as keyof ResetPasswordInputs)}
                    type={type}
                    placeholder={placeholder}
                    error={!!error}
                    className={className}
                  />
                  {isPassword && (
                    <button
                      type="button"
                      onClick={() => id === "confirmNewPassword" 
                        ? 
                        setShowConfirmPassword(!showConfirmPassword) 
                        : 
                        setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {(id === "newPassword" && (
                        showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />
                      )) || 
                      (id === "confirmNewPassword" && (
                        showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />
                      ))}
                    </button>
                  )}
                </div>
                {error && <p className="text-sm text-red-500">{error.message}</p>}
              </div>
            ))}

            <Button
              type="submit"
              className="w-full h-12"
              isLoading={isLoading}
            >
              Redefinir Senha
            </Button>
          </motion.form>
  )
}