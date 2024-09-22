import { z } from 'zod'
import type { FC } from 'react'
import type { StepProps } from '.'
import { motion } from 'framer-motion'
import logo from '../../../../assets/logo.svg'
import { Button, Input } from '../../../../components'
import { useForm, Controller } from 'react-hook-form'
import { cardVariants } from '../../../../animations'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  code: z
    .string()
    .length(6, 'O código deve ter 6 dígitos')
    .regex(/^\d+$/, 'O código deve conter apenas números'),
})

type FormData = z.infer<typeof schema>

export const Step03: FC<StepProps> = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    console.log(data)
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className="w-[100%] h-screen bg-[#121212] flex items-center justify-center flex-col"
    >
      <img src={logo} alt="Logo" className="w-32 h-w-32 mb-4" />
      <p className="text-white text-1xl font-semibold mb-4">Código de acesso</p>
      <form className="w-[40%] flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="code"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              className="w-full h-12 p-2 mb-2"
              type="email"
              id="email"
              placeholder="Digite seu código"
              maxLength={6}
            />
          )}
        />
        {errors.code && (
          <p className="text-red-500 text-sm mb-4">{errors.code.message}</p>
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
