import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components'

export function UserLayout() {
  return (
    <div className="bg-[#121212] flex">
      <Sidebar />
      <Outlet />
    </div>
  )
}
