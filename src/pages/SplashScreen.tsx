import { type FC } from 'react'
import { useAuth } from '../hooks'
import { wait } from '../utils/time'
import { Local } from '../services/Local'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

export const SplashScreen: FC = () => {
  const { checkJWT } = useAuth()
  const navigate = useNavigate()

  useQuery({
    queryKey: ['checkUser'],
    queryFn: async () => {
      const JWT = await Local.get('JWT')
      await wait(2)
      
      if (JWT) {
        const { mutate } = checkJWT
        mutate()
      } else {
        navigate('/login')
      }
      

      return null
    },
    enabled: true, 
  })

  return (
    <div className="bg-[#121212] w-full h-[100vh] flex items-center justify-center flex-col">
      <div
        className="w-8 h-8 border-4 border-solid rounded-full animate-spin"
        style={{ borderTopColor: '#217CE5' }}
      ></div>
    </div>
  )
}
