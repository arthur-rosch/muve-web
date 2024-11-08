import { z } from 'zod'
import { useState, type FC } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, toastError, Card, CheckBox } from '../../../components'

const leadFormSchema = z.object({
  plan: z.string().nonempty('Selecione um plano.'),
  name: z.string().nonempty('O nome é obrigatório.'),
  email: z.string().email('O e-mail fornecido não é válido.'),
  phone: z.string().nonempty('O número de telefone é obrigatório.'),
  cpfCnpj: z.string().nonempty('O CPF ou CNPJ é obrigatório.'),
})


type LeadFormInputs = z.infer<typeof leadFormSchema>

export const LeadCapture: FC = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LeadFormInputs>({
    resolver: zodResolver(leadFormSchema),
  })

  const handleLeadSubmit = async (data: LeadFormInputs) => {
    console.log(data)
    // Aqui, você pode adicionar a lógica para enviar os dados do lead.
  }

  return (
    <div className="w-full h-screen flex bg-[#121212]">
      <div className="w-[50%] h-screen flex items-center justify-center flex-col">
        <h1 className="text-white text-2xl font-bold mb-4">Escolha seu Plano</h1>
        <div className="flex flex-col w-full max-w-md space-y-4">
          <Controller
            name="plan"
            control={control}
            render={({ field }) => (
              <>
                {/* Bronze Plan */}
                <Card
                  variant="primary"
                  className={`p-4 ${field.value === 'Bronze' ? 'border-[#187BF0] text-[#187BF0]' : ''}`}
                  onClick={() => field.onChange('Bronze')}
                >
                  <div className="flex items-center">
                    <CheckBox
                      checked={field.value === 'Bronze'}
                      onCheckedChange={() => field.onChange('Bronze')}
                    />
                    <span className="font-bold ml-2">Bronze - R$ 87,90/mês</span>
                  </div>
                </Card>

                {/* Silver Plan */}
                <Card
                  variant="primary"
                  className={`p-4 ${field.value === 'Silver' ? 'border-[#187BF0] text-[#187BF0]' : ''}`}
                  onClick={() => field.onChange('Silver')}
                >
                  <div className="flex items-center">
                    <CheckBox
                      checked={field.value === 'Silver'}
                      onCheckedChange={() => field.onChange('Silver')}
                    />
                    <span className="font-bold ml-2">Silver - R$ 187,90/mês</span>
                  </div>
                  <span className="text-sm text-[#187BF0] bg-[#505050] px-2 py-1 rounded-full mt-1">Mais popular</span>
                  <span className="text-sm text-[#187BF0] font-semibold">7 dias grátis</span>
                </Card>

                {/* Gold Plan */}
                <Card
                  variant="primary"
                  className={`p-4 ${field.value === 'Gold' ? 'border-[#187BF0] text-[#187BF0]' : ''}`}
                  onClick={() => field.onChange('Gold')}
                >
                  <div className="flex items-center">
                    <CheckBox
                      checked={field.value === 'Gold'}
                      onCheckedChange={() => field.onChange('Gold')}
                    />
                    <span className="font-bold ml-2">Gold - R$ 387,90/mês</span>
                  </div>
                </Card>
              </>
            )}
          />
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
                placeholder="Insira seu número"
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
                id="cpfCnpj"
                placeholder="000.000.000-00 ou 00.000.000/0000-00"
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
