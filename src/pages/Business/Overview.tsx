import Card from '../../components/Card'
import PageHeader from '../../components/PageHeader'
import styles from './Business.module.css'

const STATS = [
  { label: 'Active Partners', value: '142', sub: '+8 this month' },
  { label: 'Total Commission', value: '€ 28,450', sub: 'Year to date' },
  { label: 'Pending Validations', value: '7', sub: '2 overdue' },
  { label: 'Downline Volume', value: '€ 84,200', sub: '3 tiers' },
]

const RECENT = [
  { date: '2026-05-12', event: 'New partner onboarded', who: 'M. Werner' },
  { date: '2026-05-11', event: 'Commission paid out', who: '€ 2,400 to L. Becker' },
  { date: '2026-05-10', event: 'Account locked', who: 'D. Hoffmann' },
  { date: '2026-05-08', event: 'Validation completed', who: 'S. Klein' },
]

export default function Overview() {
  return (
    <div className={styles.page}>
      <PageHeader
        title="Business Overview"
        subtitle="Affiliate operations at a glance"
      />

      <Card noTitle title="">
        <div className={styles.statGrid}>
          {STATS.map((s) => (
            <div key={s.label} className={styles.stat}>
              <span className={styles.statLabel}>{s.label}</span>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statSubLabel}>{s.sub}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card title="RECENT ACTIVITY">
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Event</th>
                <th>Who</th>
              </tr>
            </thead>
            <tbody>
              {RECENT.map((r, i) => (
                <tr key={i}>
                  <td>{r.date}</td>
                  <td>{r.event}</td>
                  <td>{r.who}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
