import { Route, Routes } from 'react-router-dom'

import { Player } from '../components'
import { Login } from '../pages/(Auth)'
import { Analytics, Video } from '../pages/(Main)'
import { UserLayout } from '../layout/UserLayout'
import { SplashScreen } from '../pages/SplashScreen'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/login" element={<Login />} />

      <Route element={<UserLayout />}>
        <Route path="/home" element={<Video />} />
        <Route path="/analytics" element={<Analytics />} />
      </Route>

      <Route path="/player/:videoId" element={<Player />} />
    </Routes>
  )
}
