import { z } from 'zod'
import type { FC } from 'react'
import { useAuth } from '../../../hooks'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '../../../components'

const registerFormSchema = z.object({
  email: z.string().email('O e-mail fornecido não é válido.'),
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres.'),
  phone: z.string().min(3, 'O telefone deve ter pelo menos 3 caracteres.'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
})

type registerFormInputs = z.infer<typeof registerFormSchema>

export const Register: FC = () => {
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<registerFormInputs>({
    resolver: zodResolver(registerFormSchema),
  })

  const handleRegister = async (data: registerFormInputs) => {
    const { success } = await signUp(data)
    if (success) {
      navigate('/login')
    } else {
      setError('email', {
        message: 'E-mail já em uso',
      })
    }
  }

  return (
    <div className="w-full h-screen flex">
      <div className="w-[50%] h-screen bg-[#121212] flex items-center justify-center flex-col">
        <h1 className="text-white text-3xl font-bold mb-4">Cadastro</h1>
        <p className="text-white text-1xl font-semibold mb-4">
          Crie uma conta dentro do Muve
        </p>
        <form
          className="w-[50%] flex flex-col"
          onSubmit={handleSubmit(handleRegister)}
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

          <label className="text-white mb-2 font-semibold" htmlFor="name">
            Nome
          </label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className="w-full h-12 p-2 mb-2"
                id="name"
                placeholder="Digite seu nome"
              />
            )}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mb-4">{errors.name.message}</p>
          )}

          <label className="text-white mb-2 font-semibold" htmlFor="phone">
            Telefone
          </label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className="w-full h-12 p-2 mb-2"
                id="phone"
                placeholder="Digite seu telefone"
              />
            )}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mb-4">{errors.phone.message}</p>
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
            className="w-full h-12 mt-4"
            type="submit"
            variant="primary"
            text="Criar"
          />

          <Button
            className="w-full h-12 mt-4"
            type="button"
            variant="secondary"
            text="Fazer login"
            onClick={() => navigate('/login')}
          />
        </form>
      </div>
      <div className="w-[50%] h-screen bg-white"></div>
    </div>
  )
}
