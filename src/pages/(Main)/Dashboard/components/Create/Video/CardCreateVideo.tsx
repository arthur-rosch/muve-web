import { useState, type FC } from 'react'
import { MonitorPlay } from '@phosphor-icons/react'
import { Card } from '../../../../../../components'
import { CreateVideoModal } from './CreateVideoModal'
import { cardVariants } from '../../../../../../animations'

export const CardCreateVideo: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <>
      <Card
        animation={true}
        variant="primary"
        variants={cardVariants}
        onClick={() => setIsModalOpen(!isModalOpen)}
        className="w-72 h-36 p-6 rounded-lg"
      >
        <MonitorPlay size={32} />
        <span className="hover:text-[#187BF0] text-lg">+ Novo video</span>
      </Card>
      <CreateVideoModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  )
}
