import { z } from 'zod'
import { type FC } from 'react'
import { useLead } from '../../../hooks'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Card } from '../../../components'

const leadFormSchema = z.object({
  plan: z.string().nonempty('Selecione um plano.'),
  name: z.string().nonempty('O nome é obrigatório.'),
  email: z.string().email('O e-mail fornecido não é válido.'),
  phone: z.string().nonempty('O número de telefone é obrigatório.'),
  cpfCnpj: z.string().nonempty('O CPF ou CNPJ é obrigatório.'),
})


type LeadFormInputs = z.infer<typeof leadFormSchema>

export const LeadCapture: FC = () => {
  const { createLed } = useLead()

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LeadFormInputs>({
    resolver: zodResolver(leadFormSchema),
  })

  const handleLeadSubmit = async (formData: LeadFormInputs) => {
    const { success, data } = await createLed({
      ...formData,
      document: formData.cpfCnpj
    })

    if (success) {
      window.location.href = data.checkoutUrl
    }
  }

  return (
    <div className="w-full h-screen flex bg-[#121212]">
      <div className="w-[50%] h-screen flex items-center justify-center flex-col bg-[#1b1a1a]">
        <div className='max-w-xl w-full'>
          <h1 className="text-white text-2xl font-bold mb-4">Escolha seu Plano</h1>
          <div className="flex flex-col w-full max-w-xl space-y-4">
            <Controller
              name="plan"
              control={control}
              render={({ field }) => (
                <>
                  <Card
                    variant={field.value === 'Plano - Essencial' ? 'selected' : 'primary'}
                    className="p-6 rounded-xl border-2 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg cursor-pointer"
                    onClick={() => field.onChange('Plano - Essencial')}
                  >
                    <div className="w-full flex justify-between items-center">
                      <span className="font-semibold text-lg">Plano - Essencial</span>
                      <span className="text-end font-bold text-[#187BF0]">
                        R$ 97,00/mês
                        <div className="mt-3">
                          <span className="text-xs text-white bg-[#187BF0] px-2 py-1 rounded-full">7 dias grátis</span>
                        </div>
                      </span>
                    </div>
                    <div className="mt-2">
                      <span className="text-sm text-gray-500">Limite: Até 10 vídeos</span>
                    </div>
                  </Card>

                  {/* Card Plano Profissional */}
                  <Card
                    variant={field.value === 'Plano - Profissional' ? 'selected' : 'primary'}
                    className="p-6 rounded-xl border-2 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg cursor-pointer"
                    onClick={() => field.onChange('Plano - Profissional')}
                  >
                    <div className="w-full flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-lg">Plano - Profissional</span>
                        <span className="text-xs text-white bg-[#187BF0] px-4 py-1 rounded-full">Mais popular</span>
                      </div>
                      <span className="text-end font-bold text-[#187BF0]">
                        R$ 147,00/mês
                        <div className="mt-3">
                          <span className="text-xs text-white bg-[#187BF0] px-2 py-1 rounded-full">7 dias grátis</span>
                        </div>
                      </span>
                    </div>
                    <div className="mt-2">
                      <span className="text-sm text-gray-500">Limite: Até 25 vídeos</span>
                    </div>
                  </Card>

                  {/* Card Plano Ilimitado */}
                  <Card
                    variant={field.value === 'Plano - Ilimitado' ? 'selected' : 'primary'}
                    className="p-6 rounded-xl border-2 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg cursor-pointer"
                    onClick={() => field.onChange('Plano - Ilimitado')}
                  >
                    <div className="w-full flex justify-between items-center">
                      <span className="font-semibold text-lg">Plano - Ilimitado</span>
                      <span className="text-end font-bold text-[#187BF0]">
                        R$ 257,00/mês
                        <div className="mt-3">
                          <span className="text-xs text-white bg-[#187BF0] px-2 py-1 rounded-full">7 dias grátis</span>
                        </div>
                      </span>
                    </div>
                    <div className="mt-2">
                      <span className="text-sm text-gray-500">Limite: Até 150 vídeos</span>
                    </div>
                  </Card>
                </>
              )}
            />

          </div>
        </div>

      </div>
      <div className="w-[50%] h-screen flex items-center justify-center">
        <form
          className="w-[80%] flex flex-col"
          onSubmit={handleSubmit(handleLeadSubmit)}
        >
          <h1 className="text-white text-2xl font-bold mb-4">Preencha seus dados</h1>
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
                placeholder="Digite seu nome completo"
              />
            )}
          />
          {errors.name && <p className="text-red-500 text-sm mb-4">{errors.name.message}</p>}

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
          {errors.email && <p className="text-red-500 text-sm mb-4">{errors.email.message}</p>}

          <label className="text-white mb-2 font-semibold" htmlFor="phone">
            Número de Telefone
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
                isMask={true}
                mask="(99) 99999-9999"
                placeholder="(99) 99999-9999"
              />
            )}
          />
          {errors.phone && <p className="text-red-500 text-sm mb-4">{errors.phone.message}</p>}

          <label className="text-white mb-2 font-semibold" htmlFor="cpfCnpj">
            CPF/CNPJ
          </label>
          <Controller
            name="cpfCnpj"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className="w-full h-12 p-2 mb-2"
                type="text"
                id="cpf"
                isMask={true}
                mask='999.999.999.99'
                placeholder="000.000.000-00"
              />
            )}
          />
          {errors.cpfCnpj && <p className="text-red-500 text-sm mb-4">{errors.cpfCnpj.message}</p>}

          <Button
            className="w-full h-12 mt-4"
            type="submit"
            variant="primary"
            text="Criar Conta"
          />
        </form>
      </div>
    </div>
  )
}
