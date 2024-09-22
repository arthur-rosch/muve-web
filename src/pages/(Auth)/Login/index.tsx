import { z } from 'zod'
import type { FC } from 'react'
import { useAuth } from '../../../hooks'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, toastError } from '../../../components'

const loginFormSchema = z.object({
  email: z.string().email('O e-mail fornecido não é válido.'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
})

type loginFormInputs = z.infer<typeof loginFormSchema>

export const Login: FC = () => {
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<loginFormInputs>({
    resolver: zodResolver(loginFormSchema),
  })

  const handleLogin = async ({ email, password }: loginFormInputs) => {
    console.log(email, password)
    const { success, Erro } = await signIn({ email, password })
    if (success) {
      navigate('/dashboard')
    } else {
      if (
        Erro === 'Subscription cancelled, Subscribe to a plan to gain access'
      ) {
        toastError({
          text: 'Assinatura cancelada. Assine um plano para obter acesso',
        })
      }
      if (Erro === 'Late Subscription. Renew your plan to gain access') {
        toastError({
          text: 'Assinatura atrasada. Renove seu plano para ter acesso',
        })
      } else {
        setError('password', {
          message: 'E-mail e/ou senha inválidos',
        })
      }
    }
  }

  return (
    <div className="w-full h-screen flex">
      <div className="w-[50%] h-screen bg-[#121212] flex items-center justify-center flex-col">
        <h1 className="text-white text-3xl font-bold mb-4">Login</h1>
        <p className="text-white text-1xl font-semibold mb-4">
          Entre com seu Email pra fazer login na sua conta
        </p>
        <form
          className="w-[50%] flex flex-col"
          onSubmit={handleSubmit(handleLogin)}
        >
          <label className="text-white mb-2 font-semibold" htmlFor="email">
            E-mail
          </label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className="w-full h-12 p-2 mb-2"
                type="email"
                id="email"
                placeholder="Digite seu e-mail"
              />
            )}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mb-4">{errors.email.message}</p>
          )}
          <label className="text-white mb-2 font-semibold" htmlFor="password">
            Senha
          </label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className="w-full h-12 p-2 mb-2"
                type="password"
                id="password"
                placeholder="Digite sua senha"
              />
            )}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-4">
              {errors.password.message}
            </p>
          )}
          <Button
            className="w-full h-12  mt-4 "
            type="submit"
            variant="primary"
            text="Entrar"
          />

          <Button
            className="w-full h-12  mt-4 "
            type="button"
            variant="secondary"
            text="Criar conta"
            onClick={() => navigate('/register')}
          />
        </form>
      </div>
      <div className="w-[50%] h-screen bg-white"></div>
    </div>
  )
}
