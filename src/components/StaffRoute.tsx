import { useEffect, type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useRole } from '../context/RoleContext'
import { useToast } from '../context/ToastContext'

type Props = {
  children: ReactNode
}

export default function StaffRoute({ children }: Props) {
  const { isAuthenticated } = useAuth()
  const { isStaff } = useRole()
  const { showToast } = useToast()

  useEffect(() => {
    if (isAuthenticated && !isStaff) {
      showToast("You don't have permission to view this page", 'warn')
    }
  }, [isAuthenticated, isStaff, showToast])

  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (!isStaff) return <Navigate to="/" replace />
  return <>{children}</>
}
