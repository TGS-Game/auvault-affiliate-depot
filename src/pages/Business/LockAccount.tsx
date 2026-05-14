import { useState, type FormEvent } from 'react'
import Card from '../../components/Card'
import PageHeader from '../../components/PageHeader'
import { LockIcon } from '../../components/icons'
import styles from './Business.module.css'

export default function LockAccount() {
  const [accountId, setAccountId] = useState('')
  const [reason, setReason] = useState('Suspicious activity')
  const [notes, setNotes] = useState('')
  const [done, setDone] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setDone(true)
  }

  if (done) {
    return (
      <div className={styles.page}>
        <PageHeader
          title="Account Locked"
          subtitle={`Account ${accountId} has been locked.`}
        />
        <Card title="WHAT HAPPENS NEXT">
          <p style={{ marginBottom: 16, color: 'var(--text-light)' }}>
            The account holder has been notified by email. Compliance will review
            the locked account within 24 hours. Use the Downline page to track
            status.
          </p>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={() => {
              setDone(false)
              setAccountId('')
              setReason('Suspicious activity')
              setNotes('')
            }}
          >
            Lock another account
          </button>
        </Card>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <PageHeader
        title="Lock an Account"
        subtitle="Suspend access pending review"
      />
      <Card
        title="LOCK ACCOUNT"
        toolbar={<LockIcon size={20} />}
      >
        <form className={styles.form} onSubmit={submit}>
          <div className={styles.formGrid}>
            <label className={`${styles.field} ${styles.fieldFull}`}>
              <span className={styles.fieldLabel}>Account ID or email</span>
              <input
                className={styles.input}
                required
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                placeholder="e.g. ACC-00482 or user@example.com"
              />
            </label>
            <label className={`${styles.field} ${styles.fieldFull}`}>
              <span className={styles.fieldLabel}>Reason</span>
              <select
                className={styles.select}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              >
                <option>Suspicious activity</option>
                <option>Failed KYC re-verification</option>
                <option>Partner request</option>
                <option>Compliance hold</option>
                <option>Other</option>
              </select>
            </label>
            <label className={`${styles.field} ${styles.fieldFull}`}>
              <span className={styles.fieldLabel}>Notes (internal)</span>
              <textarea
                className={styles.textarea}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Optional context for compliance"
              />
            </label>
          </div>
          <div className={styles.formActions}>
            <button type="submit" className={styles.btnPrimary}>
              Lock Account
            </button>
          </div>
        </form>
      </Card>
    </div>
  )
}
