import { Route, Routes } from 'react-router-dom'

import { Login, Register, ResetPassword, FirstAccess } from '../pages/(Auth)'
import { Profile } from '../pages/(Main)/Profile'
import { UserLayout } from '../layout/UserLayout'
import { SplashScreen } from '../pages/SplashScreen'
import { PlayerWrapper } from '../components/Players/playerWrapper'
import { Analytics, Dashboard, EditVideo, Folder } from '../pages/(Main)'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset/password" element={<ResetPassword />} />

      <Route path="/access" element={<FirstAccess />} />

      <Route element={<UserLayout />}>
        <Route path="/folder" element={<Folder />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit/video" element={<EditVideo />} />
      </Route>

      <Route path="/player" element={<PlayerWrapper />} />
    </Routes>
  )
}
