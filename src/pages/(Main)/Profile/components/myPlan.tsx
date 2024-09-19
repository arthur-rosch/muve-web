import type { FC } from 'react'
import { motion } from 'framer-motion'
import { Input } from '../../../../components'
import { cardVariants } from '../../../../animations'
import { limitPlan } from '../../../../utils'

export const MyPlan: FC = () => {
  const plan = JSON.parse(localStorage.getItem('@storage:plan')!)

  const limits = limitPlan(plan.plan)

  return (
    <section className="w-full mt-12">
      <motion.header
        className="flex flex-col border-b-[1px] border-solid border-[#333333] mb-6 pb-3"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <span className="text-white text-lg flex items-start justify-start">
          Meu plano
        </span>
        <span className="text-[#909090] text-sm mt-4">detalhes do plano.</span>
      </motion.header>
      <motion.div
        className="flex items-start justify-start border-b-[1px] border-solid border-[#333333] mb-6 pb-3"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <div className="w-[200px] flex flex-col">
          <span className="text-white text-sm">Plano</span>
          <span className="text-[#909090] text-sm mt-4">
            Validade / Limites
          </span>
        </div>
        <div className="w-[600px] flex ml-96 gap-4">
          <div className="w-full">
            <label htmlFor="folderName1" className="text-white text-sm">
              Validade
            </label>
            <Input
              type="text"
              disabled={true}
              placeholder={plan.validity}
              className="w-full mt-2 mb-2"
            />
          </div>
          <div className="w-full">
            <label htmlFor="folderName1" className="text-white text-sm">
              Limites
            </label>
            <Input
              type="text"
              disabled={true}
              className="w-full mt-2 mb-2"
              placeholder={String(limits)}
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
