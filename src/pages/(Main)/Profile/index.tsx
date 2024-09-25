import type { FC } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import bgProfile from '../../../assets/bg-profile.png'
import { Button, HeaderFolder } from '../../../components'
import {
  Security,
  MyPlan,
  MyProfile,
  MyInvoices,
  EditProfileModal,
} from './components'
import type { State } from '../../../redux/store/configureStore'

export const Profile: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { user } = useSelector((state: State) => state.user)

  const [activeTab, setActiveTab] = useState<
    'profile' | 'security' | 'plan' | 'invoices'
  >('profile')

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'security':
        return <Security />
      case 'plan':
        return <MyPlan />
      case 'invoices':
        return <MyInvoices />
      default:
        return <MyProfile />
    }
  }

  return (
    <>
      <section className="w-full max-h-[100vh] pb-20 pr-4 mx-8 overflow-auto">
        <HeaderFolder name={'Meu perfil'} />

        <div className="w-full flex flex-col mt-10">
          <img alt="" src={bgProfile} className="w-full h-36 rounded-lg mb-6" />
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start gap-8 ml-16">
              <button className="w-40 h-40 bg-[#1D1D1D] rounded-full text-[#777777] hover:text-white transactions-all mt-[-5rem] text-5xl">
                {user.name[0]}
              </button>
              <div className="gap-4">
                <span className="text-white text-lg flex items-start justify-start">
                  {user.name}
                </span>
                <span className="text-[#909090] text-sm mt-4">
                  {user.email}
                </span>
              </div>
            </div>
            <Button
              variant="link"
              type="button"
              text={'Editar Perfil'}
              onClick={() => setIsModalOpen(!isModalOpen)}
              className="w-40 h-10 py-3 px-8 border-[1px] border-solid border-[#333333] flex items-center"
            />
          </div>

          <div className="w-full h-full bg-[#141414] border-[1px] border-solid border-[#333333] p-6 mt-16">
            <header className="flex items-start justify-start">
              {/* Cada botão define uma aba ativa ao ser clicado */}
              <Button
                type="button"
                variant="link"
                className={`px-4 py-3 text-sm ${activeTab === 'profile' ? 'bg-[#333333] text-white' : ''}`}
                text="Meu perfil"
                onClick={() => setActiveTab('profile')}
              />
              <Button
                type="button"
                variant="link"
                className={`px-4 py-3 text-sm ${activeTab === 'security' ? 'bg-[#333333] text-white' : ''}`}
                text="Segurança"
                onClick={() => setActiveTab('security')}
              />
              <Button
                type="button"
                variant="link"
                className={`px-4 py-3 text-sm ${activeTab === 'plan' ? 'bg-[#333333] text-white' : ''}`}
                text="Informações do plano"
                onClick={() => setActiveTab('plan')}
              />
              <Button
                type="button"
                variant="link"
                className={`px-4 py-3 text-sm ${activeTab === 'invoices' ? 'bg-[#333333] text-white' : ''}`}
                text="Lista de faturas"
                onClick={() => setActiveTab('invoices')}
              />
            </header>

            {renderActiveComponent()}
          </div>
        </div>
      </section>
      <EditProfileModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  )
}
