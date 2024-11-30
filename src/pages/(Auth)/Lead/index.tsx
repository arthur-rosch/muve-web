import { z } from 'zod'
import React, { useState } from 'react'
import { useLead } from '../../../hooks'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, Star, Zap, Infinity } from 'lucide-react'

const leadFormSchema = z.object({
  plan: z.string().nonempty('Selecione um plano.'),
  name: z.string().nonempty('O nome é obrigatório.'),
  email: z.string().email('O e-mail fornecido não é válido.'),
  phone: z.string().nonempty('O número de telefone é obrigatório.'),
  cpfCnpj: z.string().nonempty('O CPF ou CNPJ é obrigatório.'),
})

type LeadFormInputs = z.infer<typeof leadFormSchema>

const plans = [
  { name: 'Essencial', price: '97', limit: 'Até 10 vídeos', icon: Star },
  { name: 'Profissional', price: '147', limit: 'Até 25 vídeos', popular: true, icon: Zap },
  { name: 'Ilimitado', price: '257', limit: 'Até 150 vídeos', icon: Infinity },
]

export function LeadCapture() {
  const { createLed } = useLead()
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(plans.findIndex((plan) => plan.popular) || 0);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormInputs>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      plan: plans[selectedPlanIndex].name,
    },
  });

  const handleLeadSubmit = async (formData: LeadFormInputs) => {
    console.log(formData);

    const { success, data } =  await createLed({
      ...formData,
      document: formData.cpfCnpj,
    })

    if (success) {
      window.location.href = data.checkoutUrl
    }
  };

  return (
    <div className="max-h-full bg-[#0B0F17] text-white flex flex-col items-center justify-start px-4 py-6 md:py-12 overflow-auto">
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-bold text-center leading-tight mb-2 md:mb-4">
          Escolha seu Plano e <br />
          Comece Agora
        </h1>
        <p className="text-[#8F9BBA] text-center text-sm md:text-base mb-6 md:mb-8">
          Com o Muve, você tem personalização, análise detalhada e um custo fixo.
          <br className="hidden md:inline" />
          Sem surpresas, sem pagar por play.
        </p>
        
        {/* Planos */}
        <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                onClick={() => setSelectedPlanIndex(index)}
                className={`w-full rounded-lg transition-all duration-300 cursor-pointer overflow-hidden ${
                  selectedPlanIndex === index
                    ? 'bg-[#187BF0]'
                    : 'bg-[#1A1F37] hover:bg-[#242B45]'
                }`}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-5 h-5 md:w-6 md:h-6 ${selectedPlanIndex === index ? 'text-white' : 'text-[#8F9BBA]'}`} />
                      <div>
                        <h3 className="font-medium text-base md:text-lg">{plan.name}</h3>
                        <p className={`text-xs md:text-sm ${selectedPlanIndex === index ? 'text-white' : 'text-[#8F9BBA]'}`}>
                          {plan.limit}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-baseline">
                        <span className="text-xs md:text-sm">R$</span>
                        <span className="text-xl md:text-2xl font-bold ml-1">{plan.price}</span>
                        <span className={`text-xs md:text-sm ${selectedPlanIndex === index ? 'text-white' : 'text-[#8F9BBA]'}`}>
                          /mês
                        </span>
                      </div>
                      <p className={`text-[10px] md:text-xs mt-1 ${
                        selectedPlanIndex === index
                          ? 'text-white font-bold bg-[#1569D3] px-2 py-0.5 rounded-full inline-block'
                          : 'text-[#8F9BBA]'
                      }`}>
                        7 dias grátis
                      </p>
                    </div>
                  </div>
                  {selectedPlanIndex === index && (
                    <div className="flex items-center mt-2 text-xs md:text-sm">
                      <Check className="w-4 h-4 mr-1.5" />
                      Selecionado
                    </div>
                  )}
                </div>
                {plan.popular && (
                  <div className="bg-[#187BF0] text-center py-1 text-[10px] md:text-xs font-medium">
                    Mais popular
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Formulário */}
        <div className="w-full">
          <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6">Crie sua conta</h2>
          <form onSubmit={handleSubmit(handleLeadSubmit)} className="space-y-4 md:space-y-6">
            <FormField
              label="Nome"
              name="name"
              control={control}
              errors={errors}
              placeholder="Seu nome completo"
            />
            <FormField
              label="E-mail"
              name="email"
              control={control}
              errors={errors}
              placeholder="seu@email.com"
              type="email"
            />
            <FormField
              label="Telefone"
              name="phone"
              control={control}
              errors={errors}
              placeholder="(00) 00000-0000"
            />
            <FormField
              label="CPF/CNPJ"
              name="cpfCnpj"
              control={control}
              errors={errors}
              placeholder="000.000.000-00"
            />
            <button
              type="submit"
              className="w-full py-3 md:py-4 mt-2 bg-[#187BF0] hover:bg-[#1569D3] text-white font-medium rounded-lg transition-all duration-300 text-base md:text-lg"
            >
              Criar Conta
            </button>
          </form>
          <p className="text-[10px] md:text-xs text-[#8F9BBA] text-center mt-4 md:mt-6">
            Ao criar uma conta, você concorda com nossos Termos de Serviço e Política de Privacidade.
          </p>
        </div>
      </div>
    </div>
  );
}

interface FormFieldProps {
  label: string
  name: keyof LeadFormInputs
  control: any
  errors: any
  placeholder: string
  type?: string
}

function FormField({ label, name, control, errors, placeholder, type = 'text' }: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm md:text-base font-medium mb-1 md:mb-1.5 text-[#8F9BBA]" htmlFor={name}>
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            className="w-full h-12 md:h-14 px-3 py-2 md:py-3 bg-[#1A1F37] rounded-lg text-white placeholder-[#8F9BBA]/50 focus:ring-1 focus:ring-[#187BF0] outline-none transition-all duration-300 text-base"
            type={type}
            id={name}
            placeholder={placeholder}
          />
        )}
      />
      {errors[name] && <p className="mt-1 text-xs md:text-sm text-red-400">{errors[name].message}</p>}
    </div>
  )
}

