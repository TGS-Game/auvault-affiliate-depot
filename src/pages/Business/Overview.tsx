import Card from '../../components/Card'
import PageHeader from '../../components/PageHeader'
import PartnerSelector from '../../components/PartnerSelector'
import { usePartnerView } from '../../context/PartnerViewContext'
import { scaleAmount } from '../../utils/scale'
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
  const { factor, partner } = usePartnerView()

  return (
    <div className={styles.page}>
      <PageHeader
        title="Business Overview"
        subtitle={
          partner
            ? `Affiliate operations for ${partner.name}`
            : 'Affiliate operations at a glance'
        }
      />

      <PartnerSelector />

      <Card noTitle title="">
        <div className={styles.statGrid}>
          {STATS.map((s) => (
            <div key={s.label} className={styles.stat}>
              <span className={styles.statLabel}>{s.label}</span>
              <span className={styles.statValue}>{scaleAmount(s.value, factor)}</span>
              <span className={styles.statSubLabel}>{scaleAmount(s.sub, factor)}</span>
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
                  <td>{scaleAmount(r.who, factor)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
