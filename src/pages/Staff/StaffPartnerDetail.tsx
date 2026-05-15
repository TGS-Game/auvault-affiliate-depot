import { Link, useParams } from 'react-router-dom'
import Card from '../../components/Card'
import PageHeader from '../../components/PageHeader'
import { getPartner } from './staffData'
import business from '../Business/Business.module.css'
import styles from './Staff.module.css'

type Customer = {
  id: string
  name: string
  tariff: string
  status: 'Active' | 'Pending' | 'Locked'
  joined: string
}

type CommissionRow = {
  period: string
  acquisition: string
  recurring: string
  downline: string
  total: string
}

type DownlineMember = {
  name: string
  tier: 1 | 2 | 3
  volume: string
}

const SAMPLE_CUSTOMERS: Customer[] = [
  { id: 'C-1041', name: 'Alice Brennan', tariff: 'Standard 12', status: 'Active', joined: '2025-09-04' },
  { id: 'C-1052', name: 'Thomas Okafor', tariff: 'Premium 24', status: 'Active', joined: '2025-11-18' },
  { id: 'C-1067', name: 'Yuki Tanaka', tariff: 'Standard 6', status: 'Pending', joined: '2026-05-12' },
  { id: 'C-1083', name: 'Lukas Becker', tariff: 'Premium 24', status: 'Active', joined: '2026-01-22' },
  { id: 'C-1090', name: 'Maria Costa', tariff: 'Standard 12', status: 'Active', joined: '2026-02-09' },
]

const SAMPLE_COMMISSIONS: CommissionRow[] = [
  { period: 'May 2026', acquisition: '€ 2,820', recurring: '€ 480', downline: '€ 240', total: '€ 3,540' },
  { period: 'Apr 2026', acquisition: '€ 2,140', recurring: '€ 460', downline: '€ 210', total: '€ 2,810' },
  { period: 'Mar 2026', acquisition: '€ 1,900', recurring: '€ 440', downline: '€ 180', total: '€ 2,520' },
  { period: 'Feb 2026', acquisition: '€ 1,620', recurring: '€ 410', downline: '€ 160', total: '€ 2,190' },
]

const SAMPLE_DOWNLINE: DownlineMember[] = [
  { name: 'Emma Thornton', tier: 2, volume: '€ 4,820' },
  { name: 'Robert Walsh', tier: 3, volume: '€ 1,180' },
  { name: 'Claire Donovan', tier: 3, volume: '€ 320' },
]

function statusClass(s: Customer['status']) {
  if (s === 'Active') return business.statusActive
  if (s === 'Pending') return business.statusPending
  return business.statusLocked
}

export default function StaffPartnerDetail() {
  const { partnerId } = useParams<{ partnerId: string }>()
  const partner = partnerId ? getPartner(partnerId) : undefined

  if (!partner) {
    return (
      <div className={styles.page}>
        <PageHeader title="Partner Not Found" />
        <Card noTitle title="">
          <p className={styles.emptyState}>
            No partner with that ID. <Link to="/staff/partners">Return to all partners</Link>.
          </p>
        </Card>
      </div>
    )
  }

  // Derive simple per-partner stat figures from base partner record + sample
  const customers = partner.customers
  const newThisMonth = Math.max(0, Math.round(customers * 0.12))
  const aum = (customers * 18500).toLocaleString('en-IE')

  return (
    <div className={styles.page}>
      <PageHeader
        title={partner.name}
        subtitle={`${partner.id} · Tier ${partner.tier} · ${partner.status}`}
        actions={
          <Link to="/staff/partners" className={`${styles.rowBtn} ${styles.rowBtnGoldOutline}`}>
            ← All partners
          </Link>
        }
      />

      <Card noTitle title="">
        <div className={styles.partnerStatsGrid}>
          <div className={styles.partnerStat}>
            <span className={styles.partnerStatLabel}>Customers</span>
            <span className={styles.partnerStatValue}>{customers}</span>
          </div>
          <div className={styles.partnerStat}>
            <span className={styles.partnerStatLabel}>New this month</span>
            <span className={styles.partnerStatValue}>{newThisMonth}</span>
          </div>
          <div className={styles.partnerStat}>
            <span className={styles.partnerStatLabel}>Commission MTD</span>
            <span className={styles.partnerStatValue}>{partner.commissionMtd}</span>
          </div>
          <div className={styles.partnerStat}>
            <span className={styles.partnerStatLabel}>AUM</span>
            <span className={styles.partnerStatValue}>€ {aum}</span>
          </div>
        </div>
      </Card>

      <Card title="CUSTOMERS">
        <div className={business.tableWrap}>
          <table className={business.table}>
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Name</th>
                <th>Tariff</th>
                <th>Joined</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE_CUSTOMERS.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.tariff}</td>
                  <td>{c.joined}</td>
                  <td>
                    <span
                      className={`${business.statusBadge} ${statusClass(c.status)}`}
                    >
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="COMMISSION HISTORY">
        <div className={business.tableWrap}>
          <table className={business.table}>
            <thead>
              <tr>
                <th>Period</th>
                <th>Acquisition</th>
                <th>Recurring</th>
                <th>Downline</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE_COMMISSIONS.map((row) => (
                <tr key={row.period}>
                  <td>{row.period}</td>
                  <td className={business.amount}>{row.acquisition}</td>
                  <td className={business.amount}>{row.recurring}</td>
                  <td className={business.amount}>{row.downline}</td>
                  <td className={business.amount}>{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="DOWNLINE">
        <div className={business.tableWrap}>
          <table className={business.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Tier</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE_DOWNLINE.map((d) => (
                <tr key={d.name}>
                  <td>{d.name}</td>
                  <td>
                    <span
                      className={`${styles.tierPill} ${styles[`tierPill_${d.tier}`]}`}
                    >
                      Tier {d.tier}
                    </span>
                  </td>
                  <td className={business.amount}>{d.volume}</td>
                </tr>
              ))}
              {SAMPLE_DOWNLINE.length === 0 && (
                <tr>
                  <td colSpan={3} className={styles.emptyState}>
                    No downline members.
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
