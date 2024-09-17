import { Route, Routes } from 'react-router-dom'

import { Login, Register } from '../pages/(Auth)'
import { Profile } from '../pages/(Main)/Profile'
import { UserLayout } from '../layout/UserLayout'
import { SplashScreen } from '../pages/SplashScreen'
import { PlayerWrapper } from '../components/Players/playerWrapper'
import { Analytics, Dashboard, Folder } from '../pages/(Main)'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<UserLayout />}>
        <Route path="/folder" element={<Folder />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route path="/player" element={<PlayerWrapper />} />
    </Routes>
  )
}
