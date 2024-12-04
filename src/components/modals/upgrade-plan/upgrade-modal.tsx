import { Button, Modal } from '../..'
import { useState } from 'react'
import { PlanCard } from './plan-card'
import { useSignature } from '../../../hooks'
import { Star, Zap, Infinity, X } from 'lucide-react'

const plans = [
  { name: 'Essencial', price: '97', limit: 'Até 10 vídeos', icon: Star },
  { name: 'Profissional', price: '147', limit: 'Até 25 vídeos', popular: true, icon: Zap },
  { name: 'Ilimitado', price: '257', limit: 'Até 150 vídeos', icon: Infinity },
]

interface UpgradeModalProps {
  isOpen: boolean
  email: string
  onClose: () => void
}

export function UpgradeModal({ isOpen, onClose, email }: UpgradeModalProps) {
  const { createCheckout } = useSignature()
  const [loading, setLoading] = useState(false)
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(
    plans.findIndex((plan) => plan.popular) || 0
  )

  const handleUpgrade = async () => {
        setLoading(true)

        const selectedPlan = plans[selectedPlanIndex]
        const planName = selectedPlan.name.toLowerCase()

        createCheckout.mutateAsync({
          email,
          plan: `Mensal - ${planName}`,
        }).finally(() => {
          setLoading(false)
        })
    }
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      className="max-w-2xl p-6 md:p-8"
    >
      <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X className="h-5 w-5" />
      </button>
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Atualize seu Plano
          </h2>
          <p className="text-[#8F9BBA] text-sm">
            Você atingiu o limite de vídeos do seu plano atual.
            Faça um upgrade para continuar crescendo!
          </p>
        </div>

        <div className="space-y-3">
          {plans.map((plan, index) => (
            <PlanCard
              key={plan.name}
              {...plan}
              selected={selectedPlanIndex === index}
              onClick={() => setSelectedPlanIndex(index)}
            />
          ))}
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleUpgrade}
            isLoading={loading}
            disabled={loading}
            variant={'primary'}
            className="w-full py-3 font-medium rounded-lg transition-all duration-300"
          >
            Fazer Upgrade Agora
          </Button>
        </div>

        <p className="text-xs text-[#8F9BBA] text-center">
          Você pode cancelar ou alterar seu plano a qualquer momento
        </p>
      </div>
    </Modal>
  )
}