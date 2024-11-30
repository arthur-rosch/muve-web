import { Modal } from '../'
import { useState } from 'react'
import { PlanCard } from './plan-card'
import { Star, Zap, Infinity } from 'lucide-react'

const plans = [
  { name: 'Essencial', price: '97', limit: 'Até 10 vídeos', icon: Star },
  { name: 'Profissional', price: '147', limit: 'Até 25 vídeos', popular: true, icon: Zap },
  { name: 'Ilimitado', price: '257', limit: 'Até 150 vídeos', icon: Infinity },
]

interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(
    plans.findIndex((plan) => plan.popular) || 0
  )

  const handleUpgrade = () => {
    window.location.href = `/checkout?plan=${plans[selectedPlanIndex].name.toLowerCase()}`
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      className="max-w-2xl p-6 md:p-8"
    >
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
          <button
            onClick={handleUpgrade}
            className="w-full py-3 bg-[#187BF0] hover:bg-[#1569D3] text-white font-medium rounded-lg transition-all duration-300"
          >
            Fazer Upgrade Agora
          </button>
        </div>

        <p className="text-xs text-[#8F9BBA] text-center">
          Você pode cancelar ou alterar seu plano a qualquer momento
        </p>
      </div>
    </Modal>
  )
}