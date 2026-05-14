import Card from '../../components/Card'
import PageHeader from '../../components/PageHeader'
import styles from './Business.module.css'

type Row = {
  name: string
  tier: 1 | 2 | 3
  joined: string
  volume: string
  status: 'active' | 'pending' | 'locked'
}

const ROWS: Row[] = [
  { name: 'L. Becker', tier: 1, joined: '2024-08-12', volume: '€ 18,400', status: 'active' },
  { name: 'M. Werner', tier: 1, joined: '2026-05-04', volume: '€ 2,140', status: 'pending' },
  { name: 'S. Klein', tier: 1, joined: '2025-01-22', volume: '€ 9,820', status: 'active' },
  { name: 'D. Hoffmann', tier: 2, joined: '2024-11-30', volume: '€ 4,560', status: 'locked' },
  { name: 'A. Fischer', tier: 2, joined: '2025-06-18', volume: '€ 6,210', status: 'active' },
  { name: 'P. Schmidt', tier: 2, joined: '2025-09-02', volume: '€ 3,030', status: 'active' },
  { name: 'J. Wagner', tier: 3, joined: '2025-03-14', volume: '€ 1,180', status: 'active' },
  { name: 'R. Bauer', tier: 3, joined: '2025-12-05', volume: '€ 740', status: 'active' },
]

const statusClass = (s: Row['status']) => {
  if (s === 'active') return styles.statusActive
  if (s === 'pending') return styles.statusPending
  return styles.statusLocked
}

export default function Downline() {
  return (
    <div className={styles.page}>
      <PageHeader
        title="Downline"
        subtitle="3-tier network — 8 active relationships"
      />

      <Card title="DOWNLINE PARTNERS">
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Tier</th>
                <th>Joined</th>
                <th>Volume</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.name}>
                  <td>{r.name}</td>
                  <td>T{r.tier}</td>
                  <td>{r.joined}</td>
                  <td className={styles.amount}>{r.volume}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${statusClass(r.status)}`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
