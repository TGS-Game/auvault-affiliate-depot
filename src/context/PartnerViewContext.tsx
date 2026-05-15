import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { PARTNERS } from '../pages/Staff/staffData'

export const ALL_PARTNERS = 'all'

type PartnerViewState = {
  /** 'all' or a partner ID like 'GP-001' */
  selectedPartnerId: string
  setSelectedPartnerId: (id: string) => void
}

const PartnerViewContext = createContext<PartnerViewState | null>(null)

export function PartnerViewProvider({ children }: { children: ReactNode }) {
  const [selectedPartnerId, setSelectedPartnerId] = useState<string>(ALL_PARTNERS)
  const value = useMemo<PartnerViewState>(
    () => ({ selectedPartnerId, setSelectedPartnerId }),
    [selectedPartnerId],
  )
  return (
    <PartnerViewContext.Provider value={value}>
      {children}
    </PartnerViewContext.Provider>
  )
}

export function usePartnerView() {
  const ctx = useContext(PartnerViewContext)
  if (!ctx) {
    throw new Error('usePartnerView must be used inside a PartnerViewProvider')
  }

  const isAll = ctx.selectedPartnerId === ALL_PARTNERS
  const partner = isAll
    ? null
    : PARTNERS.find((p) => p.id === ctx.selectedPartnerId) ?? null

  // Aggregate company commission across all partners (used as denominator for scaling).
  const totalCustomers = PARTNERS.reduce((sum, p) => sum + p.customers, 0)
  const factor = isAll
    ? 1
    : partner
      ? Math.max(0.02, partner.customers / Math.max(totalCustomers, 1))
      : 1

  return {
    selectedPartnerId: ctx.selectedPartnerId,
    setSelectedPartnerId: ctx.setSelectedPartnerId,
    isAll,
    partner,
    factor,
  }
}
