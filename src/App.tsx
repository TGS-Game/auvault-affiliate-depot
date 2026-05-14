import type { ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import Overview from './pages/Business/Overview'
import Downline from './pages/Business/Downline'
import NewBusinessPartner from './pages/Business/NewBusinessPartner'
import LockAccount from './pages/Business/LockAccount'
import LandingPage from './pages/Business/LandingPage'
import AccountBalance from './pages/Business/AccountBalance'
import Settlements from './pages/Business/Settlements'
import Conditions from './pages/Business/Conditions'
import AcquisitionCommission from './pages/Business/AcquisitionCommission'
import './App.css'

function LoginRoute() {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) return <Navigate to="/" replace />
  return <Login />
}

function Protected({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <Layout>{children}</Layout>
    </ProtectedRoute>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginRoute />} />
      <Route path="/" element={<Protected><Home /></Protected>} />
      <Route path="/business/overview" element={<Protected><Overview /></Protected>} />
      <Route path="/business/downline" element={<Protected><Downline /></Protected>} />
      <Route path="/business/new-business-partner" element={<Protected><NewBusinessPartner /></Protected>} />
      <Route path="/business/lock-an-account" element={<Protected><LockAccount /></Protected>} />
      <Route path="/business/landing-page" element={<Protected><LandingPage /></Protected>} />
      <Route path="/business/account-balance" element={<Protected><AccountBalance /></Protected>} />
      <Route path="/business/settlements" element={<Protected><Settlements /></Protected>} />
      <Route path="/business/conditions" element={<Protected><Conditions /></Protected>} />
      <Route path="/business/acquisition-commission" element={<Protected><AcquisitionCommission /></Protected>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
