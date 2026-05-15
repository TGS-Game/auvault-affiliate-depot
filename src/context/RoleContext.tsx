import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { useAuth, type UserRole } from '../hooks/useAuth'

type RoleContextValue = {
  role: UserRole | null
  isPartner: boolean
  isStaff: boolean
}

const RoleContext = createContext<RoleContextValue | null>(null)

export function RoleProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const role = user?.role ?? null
  const value = useMemo<RoleContextValue>(
    () => ({
      role,
      isPartner: role === 'partner',
      isStaff: role === 'staff',
    }),
    [role],
  )
  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>
}

export function useRole() {
  const ctx = useContext(RoleContext)
  if (!ctx) {
    throw new Error('useRole must be used inside a RoleProvider')
  }
  return ctx
}
