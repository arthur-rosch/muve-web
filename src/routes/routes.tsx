import { Route, Routes } from 'react-router-dom'


import { Profile } from '../pages/(Main)/Profile'
import { UserLayout } from '../layout/UserLayout'
import { SplashScreen } from '../pages/SplashScreen'
import { PlayerWrapper } from '../components/players/playerWrapper'
import { Analytics, Dashboard, EditVideo, Folder } from '../pages/(Main)'
import { Login, ResetPassword, FirstAccess, Thanks, LeadCapture, SignUp, VerifyEmail } from '../pages/(Auth)'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verify-email" element={<VerifyEmail />} />

      <Route path="/lead" element={<LeadCapture />} />
      <Route path="/reset/password" element={<ResetPassword />} />

      <Route path="/thanks" element={<Thanks />} />
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
