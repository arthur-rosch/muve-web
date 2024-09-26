import { z } from 'zod'
import { motion } from 'framer-motion'
import { useState, type FC } from 'react'
import { useAuth } from '../../../../hooks'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cardVariants, listItensDelay } from '../../../../animations'
import { CustomModal, Input, Button, toastError } from '../../../../components'

const schema = z.object({
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
})

type FormValues = z.infer<typeof schema>

interface ForgotPasswordModalProps {
  isModalOpen: boolean
  setIsModalOpen: (value: boolean) => void
}

export const ForgotPasswordModal: FC<ForgotPasswordModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const { checkEmailExistence, generatePasswordResetToken } = useAuth()
  const [success, setSuccess] = useState(false)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: FormValues) => {
    const { success } = await checkEmailExistence.mutateAsync({
      email: data.email,
    })

    if (!success) {
      const { success: successSendEmail } =
        await generatePasswordResetToken.mutateAsync({
          email: data.email,
        })
      if (successSendEmail) {
        setSuccess(true)
      } else {
        toastError({
          text: 'Ops... Ocorreu um erro ao tentar enviar o e-mail',
        })
      }
    } else {
      toastError({
        text: 'Ops... O e-mail não está cadastrado no nosso sistema',
      })
    }
  }

  return (
    <CustomModal.Root
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      styles={'h-auto w-[40rem] flex flex-col m-auto'}
    >
      <CustomModal.Title
        title="Recuperar Senha"
        setIsOpen={setIsModalOpen}
        subTitle="Digite seu e-mail para receber instruções de redefinição de senha"
      />
      {success ? (
        <>
          <CustomModal.Success text="E-mail para recuperar senha enviado com sucesso." />
          <div className="w-full gap-12 flex items-center justify-between py-6 px-8 border-t-[1px] border-solid border-[#333333]">
            <Button
              type="button"
              variant="primary"
              animation={true}
              variants={cardVariants}
              className="w-full flex items-center justify-center py-3 px-4 h-10"
              onClick={() => {
                setIsModalOpen(false)
                setSuccess(false)
              }}
            >
              Confirmar
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="w-full p-6">
            <motion.div
              className="w-full"
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <label htmlFor="email" className="text-white text-sm">
                E-mail
              </label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="exemplo@dominio.com"
                    className="w-full h-10 mt-2 mb-2"
                    animation={true}
                    variants={listItensDelay}
                  />
                )}
              />
              {errors.email && (
                <span className="text-red-500 text-xs">
                  {errors.email.message}
                </span>
              )}
            </motion.div>
          </div>
          <div className="w-full gap-12 flex items-center justify-between py-2 px-8 border-t-[1px] border-solid border-[#333333]">
            <Button
              type="button"
              variant="danger"
              animation={true}
              variants={cardVariants}
              onClick={() => setIsModalOpen(false)}
              className="w-full flex items-center justify-center py-3 px-4 h-10"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              variant="primary"
              animation={true}
              variants={cardVariants}
              className="w-full flex items-center justify-center py-3 px-4 h-10"
              onClick={handleSubmit(onSubmit)}
            >
              Confirmar
            </Button>
          </div>
        </>
      )}
    </CustomModal.Root>
  )
}
