import { z } from 'zod'
import { type FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, toastError } from '../../../components'
import loginImg from '../../../assets/bg-login.png'
import logo from '../../../assets/logo.svg'
import { useAuth } from '../../../hooks'

const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, 'A nova senha deve ter pelo menos 6 caracteres.'),
    confirmNewPassword: z
      .string()
      .min(6, 'A confirmação de senha deve ter pelo menos 6 caracteres.'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'As senhas devem ser iguais.',
    path: ['confirmNewPassword'], // O caminho para exibir o erro no campo correto
  })

type ResetPasswordInputs = z.infer<typeof resetPasswordSchema>

export const ResetPassword: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const queryParams = new URLSearchParams(location.search)
  const token = queryParams.get('token')

  const { forgotPassword } = useAuth()

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ResetPasswordInputs>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const handlePasswordReset = async ({
    newPassword,
    confirmNewPassword,
  }: ResetPasswordInputs) => {
    console.log(newPassword, confirmNewPassword, token)

    try {
      const { success } = await forgotPassword.mutateAsync({
        newPassword,
        confirmNewPassword,
        token: token!,
      })
      if (success) {
        navigate('/login')
      } else {
        toastError({
          text: 'Erro ao tentar resetar a senha.',
        })
      }
    } catch (error) {
      console.error(error)
      setError('newPassword', {
        message: 'Erro ao resetar a senha.',
      })
    }
  }

  return (
    <>
      <div className="w-full h-screen flex bg-[#121212]">
        <div className="w-[50%] h-screen  flex items-center justify-center flex-col">
          <img src={logo} alt="" className="mb-8" />
          <h1 className="text-white text-3xl font-bold mb-4">
            Redefinir Senha
          </h1>
          <p className="text-white text-1xl font-semibold mb-4">
            Defina sua nova senha
          </p>
          <form
            className="w-[50%] flex flex-col"
            onSubmit={handleSubmit(handlePasswordReset)}
          >
            <label
              className="text-white mb-2 font-semibold"
              htmlFor="newPassword"
            >
              Nova Senha
            </label>
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  className="w-full h-12 p-2 mb-2"
                  type="password"
                  id="newPassword"
                  placeholder="Digite sua nova senha"
                />
              )}
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm mb-4">
                {errors.newPassword.message}
              </p>
            )}

            <label
              className="text-white mb-2 font-semibold"
              htmlFor="confirmNewPassword"
            >
              Confirmar Nova Senha
            </label>
            <Controller
              name="confirmNewPassword"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  className="w-full h-12 p-2 mb-2"
                  type="password"
                  id="confirmNewPassword"
                  placeholder="Confirme sua nova senha"
                />
              )}
            />
            {errors.confirmNewPassword && (
              <p className="text-red-500 text-sm mb-4">
                {errors.confirmNewPassword.message}
              </p>
            )}

            <Button
              className="w-full h-12  mt-4"
              type="submit"
              variant="primary"
              text="Redefinir Senha"
            />
          </form>
        </div>
        <div className="w-[50%] h-screen p-8">
          <img src={loginImg} alt="" className="rounded-xl h-full w-full" />
        </div>
      </div>
    </>
  )
}
