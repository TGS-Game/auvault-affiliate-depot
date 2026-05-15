export type PartnerTier = 1 | 2 | 3
export type PartnerStatus = 'Active' | 'Pending' | 'Locked'

export type StaffPartner = {
  id: string
  name: string
  tier: PartnerTier
  customers: number
  commissionMtd: string
  status: PartnerStatus
}

export const PARTNERS: StaffPartner[] = [
  { id: 'GP-001', name: 'James Hargreaves', tier: 1, customers: 42, commissionMtd: '€ 8,240', status: 'Active' },
  { id: 'GP-002', name: 'Sarah Mitchell', tier: 1, customers: 31, commissionMtd: '€ 6,180', status: 'Active' },
  { id: 'GP-003', name: 'David Chen', tier: 2, customers: 18, commissionMtd: '€ 2,940', status: 'Active' },
  { id: 'GP-004', name: 'Emma Thornton', tier: 2, customers: 12, commissionMtd: '€ 1,820', status: 'Active' },
  { id: 'GP-005', name: 'Robert Walsh', tier: 3, customers: 8, commissionMtd: '€ 980', status: 'Active' },
  { id: 'GP-006', name: 'Priya Patel', tier: 3, customers: 6, commissionMtd: '€ 740', status: 'Pending' },
  { id: 'GP-007', name: 'Marcus Webb', tier: 2, customers: 0, commissionMtd: '€ 0', status: 'Locked' },
  { id: 'GP-008', name: 'Claire Donovan', tier: 3, customers: 3, commissionMtd: '€ 320', status: 'Active' },
]

export function getPartner(id: string): StaffPartner | undefined {
  return PARTNERS.find((p) => p.id === id)
}
