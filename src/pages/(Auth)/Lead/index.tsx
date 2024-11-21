import logo from '../../../assets/logo.svg'

import { z } from 'zod'
import { useLead } from '../../../hooks'
import { ChevronDown } from 'lucide-react'
import { useState, useEffect } from 'react'
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

const plans = [
  { name: 'Plano - Essencial', price: '97,00', limit: 'Até 10 vídeos' },
  { name: 'Plano - Profissional', price: '147,00', limit: 'Até 25 vídeos', popular: true },
  { name: 'Plano - Ilimitado', price: '257,00', limit: 'Até 150 vídeos' },
]

export function LeadCapture() {
  const { createLed } = useLead()
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(plans.findIndex(plan => plan.popular) || 0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768)
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormInputs>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      plan: plans[selectedPlanIndex].name,
    },
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 sm:p-6 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 md:mb-10">
          Escolha seu Plano e Comece Agora
        </h1>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Selecione seu Plano</h2>
            <Controller
              name="plan"
              control={control}
              render={({ field }) => (
                <PlanCard
                  plans={plans}
                  selectedPlanIndex={selectedPlanIndex}
                  onSelect={(index) => {
                    setSelectedPlanIndex(index)
                    field.onChange(plans[index].name)
                  }}
                  isMobile={isMobile}
                />
              )}
            />
            {errors.plan && <p className="text-red-500 text-sm">{errors.plan.message}</p>}
          </div>
          <div className="mt-6 md:mt-0">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Seus Dados</h2>
            <form onSubmit={handleSubmit(handleLeadSubmit)} className="space-y-4">
              <FormField
                label="Nome"
                name="name"
                control={control}
                errors={errors}
                placeholder="Digite seu nome completo"
              />
              <FormField
                label="E-mail"
                name="email"
                control={control}
                errors={errors}
                placeholder="Digite seu e-mail"
                type="email"
              />
              <FormField
                label="Número de Telefone"
                name="phone"
                control={control}
                errors={errors}
                placeholder="(99) 99999-9999"
                mask="(99) 99999-9999"
              />
              <FormField
                label="CPF/CNPJ"
                name="cpfCnpj"
                control={control}
                errors={errors}
                placeholder="000.000.000-00"
                mask="999.999.999-99"
              />
              <Button
                className="w-full py-3 mt-6 text-lg font-semibold"
                type="submit"
                variant="primary"
              >
                Criar Conta
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

interface PlanCardProps {
  plans: Array<{
    name: string
    price: string
    limit: string
    popular?: boolean
  }>
  selectedPlanIndex: number
  onSelect: (index: number) => void
  isMobile: boolean
}

function PlanCard({ plans, selectedPlanIndex, onSelect, isMobile }: PlanCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (!isMobile) {
    return (
      <div className="space-y-4">
        {plans.map((plan, index) => (
          <Card
            key={plan.name}
            variant={selectedPlanIndex === index ? 'selected' : 'primary'}
            className={`p-4 sm:p-6 rounded-xl border-2 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg cursor-pointer ${
              selectedPlanIndex === index ? 'border-blue-500' : 'border-gray-700'
            }`}
            onClick={() => onSelect(index)}
          >
            <div className="w-full flex justify-between items-center">
              <div className="flex-1">
                <div className="font-semibold text-base sm:text-lg">
                  {plan.name}
                  {plan.popular && (
                    <span className="ml-4 inline-block mt-2 text-xs bg-blue-500 text-white px-2 py-1 rounded-full">Mais popular</span>
                  )}
                </div>
                <div className="text-sm text-gray-400 mt-1">{plan.limit}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-blue-400 text-lg sm:text-xl">R$ {plan.price}/mês</div>
                <div className="mt-4">
                  <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">7 dias grátis</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  const selectedPlan = plans[selectedPlanIndex]

  return (
    <div className="w-full relative">
      <Card
        variant="primary"
        className="p-4 sm:p-6 rounded-xl border-2 border-blue-500 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-full flex justify-between items-center">
          <div className="flex-1">
            <div className="font-semibold text-base sm:text-lg">
              {selectedPlan.name}
              {selectedPlan.popular && (
                <span className="ml-4 inline-block mt-2 text-xs bg-blue-500 text-white px-2 py-1 rounded-full">Mais popular</span>
              )}
            </div>
            <div className="text-sm text-gray-400 mt-1">{selectedPlan.limit}</div>
          </div>
          <div className="text-right">
            <div className="font-bold text-blue-400 text-lg sm:text-xl">R$ {selectedPlan.price}/mês</div>
            <div className="mt-4">
              <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">7 dias grátis</span>
            </div>
          </div>
        </div>
        <div className="absolute top-2 right-2 p-2 cursor-pointer">
          <ChevronDown className={`w-6 h-6 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
        </div>
      </Card>
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-gray-800 border border-gray-700 rounded-md shadow-lg">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`p-2 cursor-pointer hover:bg-gray-700 ${index === selectedPlanIndex ? 'bg-gray-700' : ''}`}
              onClick={() => {
                onSelect(index)
                setIsOpen(false)
              }}
            >
              {plan.name} - R$ {plan.price}/mês
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

interface FormFieldProps {
  label: string
  name: keyof LeadFormInputs
  control: any
  errors: any
  placeholder: string
  type?: string
  mask?: string
}

function FormField({ label, name, control, errors, placeholder, type = 'text', mask }: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1" htmlFor={name}>
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            className="w-full p-3 bg-gray-800 rounded text-white placeholder-gray-400"
            type={type}
            id={name}
            placeholder={placeholder}
            isMask={!!mask}
            mask={mask}
          />
        )}
      />
      {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>}
    </div>
  )
}

