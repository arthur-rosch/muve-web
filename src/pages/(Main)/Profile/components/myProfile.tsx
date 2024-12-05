import { motion } from 'framer-motion'
import type { FC } from 'react'
import { cardVariants } from '../../../../animations'
import { Input } from '../../../../components'
import type { State } from '../../../../redux/store/configureStore'
import { useSelector } from 'react-redux'

export const MyProfile: FC = () => {
  const { user } = useSelector((state: State) => state.user)

  return (
    <section className="w-full mt-12">
      <motion.header
        className="flex flex-col border-b-[1px] border-solid border-[#333333] mb-6 pb-3"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <span className="text-white text-lg flex items-start justify-start">
          Geral
        </span>
        <span className="text-[#909090] text-sm mt-4">
          Dados gerais da conta
        </span>
      </motion.header>
      <motion.div
        className="flex items-start justify-start border-b-[1px] border-solid border-[#333333] mb-6 pb-3"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <div className="w-[200px] flex flex-col">
          <span className="text-white text-sm">Nome</span>
          <span className="text-[#909090] text-sm mt-4">Meu nome</span>
        </div>
        <div className="w-[600px] ml-96">
          <Input
            type="text"
            className="w-full"
            disabled={true}
            placeholder={user.name}
          />
        </div>
      </motion.div>
      <motion.div
        className="flex items-start justify-start mb-6 pb-3"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <div className="w-[200px] flex flex-col">
          <span className="text-white text-sm">Pessoal</span>
          <span className="text-[#909090] text-sm mt-4">
            Informações pessoais
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 w-[600px] ml-96">
          <div className="w-full">
            <label htmlFor="folderName1" className="text-white text-sm">
              Nome
            </label>
            <Input
              id="folderName1"
              type="text"
              placeholder={user.name}
              disabled={true}
              className="w-full mt-2 mb-2"
            />
          </div>
          <div className="w-full">
            <label htmlFor="folderName2" className="text-white text-sm">
              Telefone
            </label>
            <Input
              id="folderName2"
              type="text"
              placeholder={user.phone}
              disabled={true}
              className="w-full mt-2 mb-2"
            />
          </div>
          <div className="w-full">
            <label htmlFor="folderName3" className="text-white text-sm">
              Documento
            </label>
            <Input
              id="folderName3"
              type="text"
              disabled={true}
              placeholder={user.document}
              className="w-full mt-2 mb-2"
            />
          </div>
          <div className="w-full">
            <label htmlFor="folderName4" className="text-white text-sm">
              Email
            </label>
            <Input
              id="folderName4"
              type="text"
              disabled={true}
              placeholder={user.email}
              className="w-full mt-2 mb-2"
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
