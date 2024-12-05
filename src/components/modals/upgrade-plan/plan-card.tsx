import { cn } from '../../../utils'
import { Check, type LucideIcon } from 'lucide-react'

interface PlanCardProps {
  name: string
  price: string
  limit: string
  icon: LucideIcon
  popular?: boolean
  selected?: boolean
  onClick?: () => void
}

export function PlanCard({
  name,
  price,
  limit,
  icon: Icon,
  popular,
  selected,
  onClick,
}: PlanCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'w-full rounded-lg transition-all duration-300 cursor-pointer overflow-hidden',
        selected ? 'bg-[#187BF0]' : 'bg-[#1A1F37] hover:bg-[#242B45]'
      )}
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon className={cn('w-5 h-5', selected ? 'text-white' : 'text-[#8F9BBA]')} />
            <div>
              <h3 className="font-medium text-base text-white">{name}</h3>
              <p className={cn('text-sm', selected ? 'text-white' : 'text-[#8F9BBA]')}>
                {limit}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-baseline text-white">
              <span className="text-sm">R$</span>
              <span className="text-xl font-bold ml-1">{price}</span>
              <span className={'text-sm'}>
                /mês
              </span>
            </div>
            <p className={cn(
              'text-xs mt-1',
              selected
                ? 'text-white font-bold bg-[#1569D3] px-2 py-0.5 rounded-full inline-block'
                : 'text-[#8F9BBA]'
            )}>
              7 dias grátis
            </p>
          </div>
        </div>
        {selected && (
          <div className="flex items-center mt-2 text-sm text-white">
            <Check className="w-4 h-4 mr-1.5" />
            Selecionado
          </div>
        )}
      </div>
      {popular && (
        <div className="bg-[#187BF0] text-center py-1 text-xs font-medium text-white">
          Mais popular
        </div>
      )}
    </div>
  )
}
