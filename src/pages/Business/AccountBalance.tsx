import Card from '../../components/Card'
import PageHeader from '../../components/PageHeader'
import styles from './Business.module.css'

const SUMMARY = [
  { label: 'Available Balance', value: '€ 7,410.00', sub: 'Ready to withdraw' },
  { label: 'Pending Commission', value: '€ 1,820.00', sub: 'Clears in 14 days' },
  { label: 'Reserved', value: '€ 240.00', sub: 'Settlement hold' },
  { label: 'Lifetime Earned', value: '€ 84,200.00', sub: 'Since join date' },
]

const HISTORY = [
  { date: '2026-05-10', type: 'Commission', desc: 'May affiliate payout', amount: '+ € 1,920.00' },
  { date: '2026-04-30', type: 'Withdrawal', desc: 'Bank transfer DE89 *** 0432', amount: '- € 3,500.00' },
  { date: '2026-04-10', type: 'Commission', desc: 'April affiliate payout', amount: '+ € 2,140.00' },
  { date: '2026-04-02', type: 'Bonus', desc: 'Quarterly partner bonus', amount: '+ € 600.00' },
  { date: '2026-03-31', type: 'Withdrawal', desc: 'Bank transfer DE89 *** 0432', amount: '- € 2,800.00' },
]

export default function AccountBalance() {
  return (
    <div className={styles.page}>
      <PageHeader
        title="Account Balance"
        subtitle="Earnings, holds, and withdrawals"
        actions={
          <button type="button" className={styles.btnPrimary}>
            Withdraw
          </button>
        }
      />

      <Card noTitle title="">
        <div className={styles.statGrid}>
          {SUMMARY.map((s) => (
            <div key={s.label} className={styles.stat}>
              <span className={styles.statLabel}>{s.label}</span>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statSubLabel}>{s.sub}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card title="TRANSACTION HISTORY">
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {HISTORY.map((h, i) => (
                <tr key={i}>
                  <td>{h.date}</td>
                  <td>{h.type}</td>
                  <td>{h.desc}</td>
                  <td className={styles.amount}>{h.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
