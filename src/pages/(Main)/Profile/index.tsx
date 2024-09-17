import logo from '../../../assets/logo.svg'
import type { FC } from 'react'
import { Button, HeaderFolder } from '../../../components'
import { MyProfile } from './components/myProfile'
import type { State } from '../../../redux/store/configureStore'
import { useSelector } from 'react-redux'

export const Profile: FC = () => {
  const { user } = useSelector((state: State) => state.user)

  return (
    <section className="w-full h-full mx-8">
      <HeaderFolder name={'Meu perfil'} />

      <div className="w-full flex flex-col mt-10">
        <img
          alt=""
          src={logo}
          className="w-full h-36 rounded-lg border-[1px] border-solid border-[#333333] mb-6"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-8 ml-16">
            <button className="w-40 h-40 bg-[#1D1D1D] rounded-full text-[#777777] hover:text-white transactions-all mt-[-5rem]" />
            <div className="gap-4">
              <span className="text-white text-lg flex items-start justify-start">
                {user.name}
              </span>
              <span className="text-[#909090] text-sm mt-4">{user.email}</span>
            </div>
          </div>
          <Button
            variant="link"
            type="button"
            text={'Editar Perfil'}
            className="w-40 h-10 py-3 px-8 border-[1px] border-solid border-[#333333] flex items-center"
          />
        </div>

        <div className="w-full h-full bg-[#141414 border-[1px] border-solid border-[#333333] p-6 mt-16">
          <header className="flex items-start justify-start">
            <Button
              type="button"
              variant="link"
              className="px-4 py-3 text-sm"
              text="Meu perfil"
            />
            <Button
              type="button"
              variant="link"
              className="px-4 py-3 text-sm"
              text="Segurança"
            />
            <Button
              type="button"
              variant="link"
              className="px-4 py-3 text-sm"
              text="Informações do plano"
            />
            <Button
              type="button"
              variant="link"
              className="px-4 py-3 text-sm"
              text="Lista de faturas"
            />
          </header>
          <MyProfile />
        </div>
      </div>
    </section>
  )
}
