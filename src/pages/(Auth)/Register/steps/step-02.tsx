import { z } from 'zod'
import type { StepProps } from '.'
import { motion } from 'framer-motion'
import logo from '../../../../assets/logo.svg'
import { type FC, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Button, Input } from '../../../../components'
import { zodResolver } from '@hookform/resolvers/zod'
import { cardVariants } from '../../../../animations'

const schema = z.object({
  email: z
    .string()
    .nonempty('O e-mail é obrigatório')
    .email('Digite um e-mail válido'),
  name: z
    .string()
    .nonempty('O nome é obrigatório')
    .min(2, 'O nome deve ter no mínimo 2 caracteres'),
  phone: z
    .string()
    .nonempty('O telefone é obrigatório')
    .min(10, 'O telefone deve ter no mínimo 10 dígitos'),
})

type FormData = z.infer<typeof schema>

export const Step02: FC<StepProps> = ({ next }) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    // Obtém o email do localStorage e atualiza o estado
    const storedEmail = localStorage.getItem('@storage-step01')
    if (storedEmail) {
      setValue('email', storedEmail)
    }
  }, [])

  const onSubmit = async (data: FormData) => {
    next()

    console.log('Dados do formulário:', data)
  }

  const phoneMask = '(99) 99999-9999'

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className="w-[100%] h-screen bg-[#121212] flex items-center justify-center flex-col"
    >
      <img src={logo} alt="Logo" className="w-32 h-w-32 mb-4" />
      <p className="text-white text-1xl font-semibold mb-4">Estamos quase lá</p>
      <form className="w-[40%] flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        {/* Campo de E-mail (Desabilitado) */}
        <label className="text-white mb-2 font-semibold" htmlFor="email">
          E-mail
        </label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              className="w-full h-12 p-2 mb-2 opacity-40"
              type="email"
              id="email"
              placeholder="Digite seu e-mail"
              disabled // Desabilita o input
            />
          )}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-4">{errors.email.message}</p>
        )}

        {/* Campo de Nome */}
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
              type="text"
              id="name"
              placeholder="Digite seu nome"
            />
          )}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mb-4">{errors.name.message}</p>
        )}

        {/* Campo de Telefone */}
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
              type="text"
              id="phone"
              placeholder="Digite seu telefone"
              isMask
              mask={phoneMask}
            />
          )}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mb-4">{errors.phone.message}</p>
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
          Ajuda
        </a>
      </form>
    </motion.div>
  )
}
