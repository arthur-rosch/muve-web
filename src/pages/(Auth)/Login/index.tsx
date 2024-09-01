import { z } from 'zod'
import type { FC } from 'react'
import { useAuth } from '../../../hooks'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

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
    const { success } = await signIn({ email, password })
    if (success) {
      navigate('/home')
    } else {
      setError('password', {
        message: 'E-mail e/ou senha inválidos',
      })
    }
  }

  return (
    <div className="w-full h-screen flex">
      <div className="w-[50%] h-screen bg-[#121316] flex items-center justify-center flex-col">
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
              <input
                {...field}
                className="w-full h-12 bg-[#121316] text-white border border-gray-400 rounded-md p-2 focus:border-[#217CE5] focus:outline-none mb-2"
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
              <input
                {...field}
                className="w-full h-12 bg-[#121316] text-white border border-gray-400 rounded-md p-2 focus:border-[#217CE5] focus:outline-none mb-2"
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
          <button
            className="w-full h-12 bg-blue-600 text-white rounded-md mt-4 hover:bg-blue-700 transition"
            type="submit"
          >
            Entrar
          </button>
          <button
            className="w-full h-12 text-blue-500 bg-transparent border-solid border-[1px] border-blue-500 rounded-md mt-4 hover:bg-blue-600 transition hover:text-white"
            type="button"
          >
            Solicitar Cadastro
          </button>
        </form>
      </div>
      <div className="w-[50%] h-screen bg-white"></div>
    </div>
  )
}
