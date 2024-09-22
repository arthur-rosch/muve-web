import logo from '../../../../assets/logo.svg'
import { Button, Input, toastError } from '../../../../components'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { cardVariants } from '../../../../animations'
import { motion } from 'framer-motion'
import { useAuth } from '../../../../hooks'
import type { StepProps } from '.'
import type { FC } from 'react'

// Definindo o schema de validação usando Zod
const schema = z.object({
  email: z
    .string()
    .nonempty('O e-mail é obrigatório')
    .email('Digite um e-mail válido'),
})

type FormData = z.infer<typeof schema>

export const Step01: FC<StepProps> = ({ next }) => {
  const { checkEmailExistence } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    const { success } = await checkEmailExistence.mutateAsync({
      email: data.email,
    })

    if (!success) {
      toastError({
        text: 'E-mail já esta em uso',
      })
    } else {
      localStorage.setItem('@storage-step01', data.email)
      next()
    }

    console.log('Dados do formulário:', data)
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className="w-[100%] h-screen bg-[#121212] flex items-center justify-center flex-col"
    >
      <img src={logo} alt="Logo" className="w-32 h-w-32 mb-4" />
      <p className="text-white text-1xl font-semibold mb-4">
        Crie uma conta dentro do Muve
      </p>
      <form className="w-[40%] flex flex-col" onSubmit={handleSubmit(onSubmit)}>
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

        <Button
          className="w-full h-12 mt-4"
          type="submit"
          variant="primary"
          text="Continuar"
        />

        <span className="text-white mt-4 text-center">
          Já é usuário?{' '}
          <a href="/login" className="text-[#187BF0] hover:underline">
            Fazer login
          </a>
        </span>

        <a
          href="https://ajuda.muveplayer.com/"
          className="text-white hover:text-[#187BF0] hover:underline text-center mt-8 transition-color duration-300"
        >
          {' '}
          Ajuda{' '}
        </a>
      </form>
    </motion.div>
  )
}
