import Card from '../../components/Card'
import PageHeader from '../../components/PageHeader'
import styles from './Business.module.css'

type Tier = {
  tier: string
  description: string
  setupFee: string
  monthlyFee: string
  rate: string
}

const RATES: Tier[] = [
  { tier: 'Direct (Tier 1)', description: 'Customer you sponsored personally', setupFee: '3.0%', monthlyFee: '0.6%', rate: '€ — see worked example' },
  { tier: 'Tier 2', description: 'Sponsored by a Tier-1 partner of yours', setupFee: '1.5%', monthlyFee: '0.3%', rate: '€ — see worked example' },
  { tier: 'Tier 3', description: 'Sponsored by a Tier-2 partner of yours', setupFee: '0.75%', monthlyFee: '0.15%', rate: '€ — see worked example' },
]

const WORKED = [
  { label: 'New customer deposit', value: '€ 10,000.00' },
  { label: 'Tier 1 setup commission (3.0%)', value: '€ 300.00' },
  { label: 'Monthly run-rate commission (0.6%)', value: '€ 60.00' },
  { label: 'First-year total (setup + 12 mo)', value: '€ 1,020.00' },
]

export default function AcquisitionCommission() {
  return (
    <div className={styles.page}>
      <PageHeader
        title="Acquisition Commission"
        subtitle="Current rate card, by tier"
      />

      <Card title="RATE CARD">
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Tier</th>
                <th>Description</th>
                <th>Setup fee share</th>
                <th>Monthly fee share</th>
              </tr>
            </thead>
            <tbody>
              {RATES.map((r) => (
                <tr key={r.tier}>
                  <td>{r.tier}</td>
                  <td>{r.description}</td>
                  <td className={styles.amount}>{r.setupFee}</td>
                  <td className={styles.amount}>{r.monthlyFee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="WORKED EXAMPLE — TIER 1">
        <ul className={styles.reviewList}>
          {WORKED.map((w, i) => (
            <li key={i} className={styles.reviewItem}>
              <span className={styles.reviewLabel}>{w.label}</span>
              <span className={`${styles.reviewValue} ${styles.amount}`}>{w.value}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
