import { Outlet, useNavigate } from 'react-router-dom'
import { Sidebar } from '../components'
import { useAuth } from '../hooks'
import { useQuery } from 'react-query'
import { Local } from '../services/Local'
import { wait } from '../utils'

export function UserLayout() {
  const { checkJWT } = useAuth()
  const navigate = useNavigate()

  useQuery('checkUser', async () => {
    const JWT = await Local.get('JWT')
    await wait(2)
    if (JWT) {
      const { success } = await checkJWT()
      if (success) {
        navigate('/dashboard')
      } else {
        navigate('/login')
      }
    } else {
      navigate('/login')
    }
  })

  return (
    <div className="w-full bg-[#121212] flex">
      <Sidebar />

      <Outlet />
    </div>
  )
}
