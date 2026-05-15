import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../../components/Card'
import PageHeader from '../../components/PageHeader'
import { useToast } from '../../context/ToastContext'
import { PARTNERS, type PartnerStatus, type StaffPartner } from './staffData'
import business from '../Business/Business.module.css'
import styles from './Staff.module.css'

type Filter = 'All' | PartnerStatus

const FILTERS: Filter[] = ['All', 'Active', 'Pending', 'Locked']

function statusClass(s: PartnerStatus) {
  if (s === 'Active') return business.statusActive
  if (s === 'Pending') return business.statusPending
  return business.statusLocked
}

export default function StaffPartners() {
  const [filter, setFilter] = useState<Filter>('All')
  const [lockedIds, setLockedIds] = useState<Set<string>>(
    () => new Set(PARTNERS.filter((p) => p.status === 'Locked').map((p) => p.id)),
  )
  const { showToast } = useToast()

  const visible = useMemo<StaffPartner[]>(() => {
    return PARTNERS.map<StaffPartner>((p) => {
      const status: PartnerStatus = lockedIds.has(p.id)
        ? 'Locked'
        : p.status === 'Locked'
          ? 'Active'
          : p.status
      return { ...p, status }
    }).filter((p) => filter === 'All' || p.status === filter)
  }, [filter, lockedIds])

  const handleLockToggle = (p: StaffPartner) => {
    setLockedIds((prev) => {
      const next = new Set(prev)
      if (next.has(p.id)) {
        next.delete(p.id)
        showToast(`${p.name} unlocked`)
      } else {
        next.add(p.id)
        showToast(`${p.name} locked`, 'warn')
      }
      return next
    })
  }

  return (
    <div className={styles.page}>
      <PageHeader
        title="All Partners"
        subtitle="Manage every business partner across the network"
      />

      <Card noTitle title="">
        <div className={styles.filterPills}>
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className={`${styles.filterPill}${filter === f ? ' ' + styles.filterPillActive : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </Card>

      <Card title="PARTNERS">
        <div className={business.tableWrap}>
          <table className={business.table}>
            <thead>
              <tr>
                <th>Partner ID</th>
                <th>Name</th>
                <th>Tier</th>
                <th>Customers</th>
                <th>Commission MTD</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((p) => {
                const locked = lockedIds.has(p.id)
                return (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                    <td>
                      <span
                        className={`${styles.tierPill} ${styles[`tierPill_${p.tier}`]}`}
                      >
                        Tier {p.tier}
                      </span>
                    </td>
                    <td>{p.customers}</td>
                    <td className={business.amount}>{p.commissionMtd}</td>
                    <td>
                      <span
                        className={`${business.statusBadge} ${statusClass(p.status)}`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td>
                      <span className={styles.rowActions}>
                        <Link
                          to={`/staff/partners/${p.id}`}
                          className={`${styles.rowBtn} ${styles.rowBtnGold}`}
                        >
                          View
                        </Link>
                        <button
                          type="button"
                          className={`${styles.rowBtn} ${styles.rowBtnBurgundy}`}
                          onClick={() => handleLockToggle(p)}
                        >
                          {locked ? 'Unlock' : 'Lock'}
                        </button>
                      </span>
                    </td>
                  </tr>
                )
              })}
              {visible.length === 0 && (
                <tr>
                  <td colSpan={7} className={styles.emptyState}>
                    No partners match this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
