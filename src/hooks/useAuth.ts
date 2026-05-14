import { useCallback, useEffect, useState } from 'react'

export type UserRole = 'partner' | 'staff'

export type AuthUser = {
  email: string
  role: UserRole
}

const STORAGE_KEY = 'auvault.affiliate.auth'
const AUTH_EVENT = 'auvault-affiliate-auth-change'

function readUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<AuthUser> | null
    if (
      parsed &&
      typeof parsed.email === 'string' &&
      (parsed.role === 'partner' || parsed.role === 'staff')
    ) {
      return { email: parsed.email, role: parsed.role }
    }
    return null
  } catch {
    return null
  }
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(() => readUser())

  useEffect(() => {
    const sync = () => setUser(readUser())
    window.addEventListener(AUTH_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(AUTH_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const login = useCallback((u: AuthUser) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
    window.dispatchEvent(new Event(AUTH_EVENT))
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    window.dispatchEvent(new Event(AUTH_EVENT))
  }, [])

  return { user, login, logout, isAuthenticated: user !== null }
}
