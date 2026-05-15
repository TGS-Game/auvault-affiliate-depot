import { useState, type FormEvent } from 'react'
import Card from '../../components/Card'
import PageHeader from '../../components/PageHeader'
import PartnerSelector from '../../components/PartnerSelector'
import styles from './Business.module.css'

type Step1 = {
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
  sponsor: string
}

const EMPTY: Step1 = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: 'Germany',
  sponsor: '',
}

export default function NewBusinessPartner() {
  const [step, setStep] = useState<1 | 2>(1)
  const [form, setForm] = useState<Step1>(EMPTY)
  const [submitted, setSubmitted] = useState(false)

  const update = (key: keyof Step1) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }))

  const goNext = (e: FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  const goBack = () => setStep(1)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className={styles.page}>
        <PageHeader
          title="Partner Added"
          subtitle={`${form.firstName} ${form.lastName} is now in the validation queue`}
        />
        <Card title="NEXT STEPS">
          <p style={{ marginBottom: 16, color: 'var(--text-light)' }}>
            We&apos;ve sent {form.email} a welcome email with their onboarding
            link. They&apos;ll appear in your downline once their KYC check
            completes (typically 24-48 hours).
          </p>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={() => {
              setSubmitted(false)
              setStep(1)
              setForm(EMPTY)
            }}
          >
            Add another partner
          </button>
        </Card>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <PageHeader
        title="New Business Partner"
        subtitle="Step-by-step partner onboarding"
      />

      <PartnerSelector />

      <Card noTitle title="">
        <div className={styles.steps}>
          <div className={`${styles.step}${step >= 1 ? ' ' + styles.stepActive : ''}`}>
            <span className={styles.stepDot}>1</span> Details
          </div>
          <span className={styles.stepSeparator} />
          <div className={`${styles.step}${step >= 2 ? ' ' + styles.stepActive : ''}`}>
            <span className={styles.stepDot}>2</span> Review &amp; Submit
          </div>
        </div>
      </Card>

      {step === 1 && (
        <Card title="PARTNER DETAILS">
          <form className={styles.form} onSubmit={goNext}>
            <div className={styles.formGrid}>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>First name</span>
                <input
                  className={styles.input}
                  required
                  value={form.firstName}
                  onChange={update('firstName')}
                />
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Last name</span>
                <input
                  className={styles.input}
                  required
                  value={form.lastName}
                  onChange={update('lastName')}
                />
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Email</span>
                <input
                  className={styles.input}
                  required
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                />
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Phone</span>
                <input
                  className={styles.input}
                  type="tel"
                  value={form.phone}
                  onChange={update('phone')}
                />
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Country</span>
                <select
                  className={styles.select}
                  value={form.country}
                  onChange={update('country')}
                >
                  <option>Germany</option>
                  <option>Austria</option>
                  <option>Switzerland</option>
                  <option>Liechtenstein</option>
                  <option>United Kingdom</option>
                </select>
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Sponsor ID</span>
                <input
                  className={styles.input}
                  value={form.sponsor}
                  onChange={update('sponsor')}
                  placeholder="Leave blank if direct"
                />
              </label>
            </div>
            <div className={styles.formActions}>
              <button type="submit" className={styles.btnPrimary}>
                Continue →
              </button>
            </div>
          </form>
        </Card>
      )}

      {step === 2 && (
        <Card title="REVIEW &amp; SUBMIT">
          <form className={styles.form} onSubmit={submit}>
            <ul className={styles.reviewList}>
              <li className={styles.reviewItem}>
                <span className={styles.reviewLabel}>Name</span>
                <span className={styles.reviewValue}>
                  {form.firstName} {form.lastName}
                </span>
              </li>
              <li className={styles.reviewItem}>
                <span className={styles.reviewLabel}>Email</span>
                <span className={styles.reviewValue}>{form.email}</span>
              </li>
              <li className={styles.reviewItem}>
                <span className={styles.reviewLabel}>Phone</span>
                <span className={styles.reviewValue}>{form.phone || '—'}</span>
              </li>
              <li className={styles.reviewItem}>
                <span className={styles.reviewLabel}>Country</span>
                <span className={styles.reviewValue}>{form.country}</span>
              </li>
              <li className={styles.reviewItem}>
                <span className={styles.reviewLabel}>Sponsor</span>
                <span className={styles.reviewValue}>
                  {form.sponsor || 'Direct'}
                </span>
              </li>
            </ul>
            <div className={styles.formActions}>
              <button type="button" className={styles.btnSecondary} onClick={goBack}>
                ← Back
              </button>
              <button type="submit" className={styles.btnPrimary}>
                Submit Partner
              </button>
            </div>
          </form>
        </Card>
      )}
    </div>
  )
}
