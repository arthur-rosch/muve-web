import { wait } from '../utils'
import { useAuth } from '../hooks'
import { Sidebar } from '../components'
import { Local } from '../services/Local'
import { useQuery } from '@tanstack/react-query'
import { Outlet, useNavigate } from 'react-router-dom'

export function UserLayout() {
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
    <div className="w-full bg-[#121212] flex">
      <Sidebar />
      <Outlet />
    </div>
  )
}
