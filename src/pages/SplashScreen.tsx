import { useAuth } from '../hooks'
import { wait } from '../utils/time'
import { type FC } from 'react'
import { useQuery } from 'react-query'
import { Local } from '../services/Local'
import { useNavigate } from 'react-router-dom'

export const SplashScreen: FC = () => {
  const { checkJWT } = useAuth()
  const navigate = useNavigate()

  useQuery('checkUser', async () => {
    const JWT = await Local.get('JWT')
    await wait(2)
    if (JWT) {
      const { success } = await checkJWT()
      if (success) {
        navigate('/home')
      } else {
        navigate('/login')
      }
    } else {
      navigate('/login')
    }
  })

  return (
    <div className="bg-[#121316] w-full h-[100vh] flex items-center justify-center flex-col">
      <div
        className="w-8 h-8 border-4 border-solid rounded-full animate-spin"
        style={{ borderTopColor: '#217CE5' }}
      ></div>
    </div>
  )
}
