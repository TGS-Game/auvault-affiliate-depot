import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, type AuthUser } from '../../hooks/useAuth'
import { EyeIcon, EyeOffIcon } from '../../components/icons'
import styles from './Login.module.css'

type Credential = AuthUser & { password: string }

const CREDENTIALS: Credential[] = [
  { email: 'partner@auvault.com', password: 'partner123', role: 'partner' },
  { email: 'staff@auvault.com', password: 'staff123', role: 'staff' },
]

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (submitting) return
    setError(null)
    setSubmitting(true)

    await new Promise((r) => setTimeout(r, 800))

    const match = CREDENTIALS.find(
      (c) =>
        c.email === email.trim().toLowerCase() && c.password === password,
    )

    if (!match) {
      setError('Invalid email or password. Please try again.')
      setSubmitting(false)
      return
    }

    login({ email: match.email, role: match.role })
    navigate('/', { replace: true })
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.sectionTitle}>AFFILIATE &amp; STAFF PORTAL</h1>

        <div className={styles.card}>
          <div className={styles.brand}>
            <span className={styles.logoText}>
              au<span className={styles.logoVault}>vault</span>
            </span>
          </div>
          <p className={styles.tagline}>Sign in to continue</p>

          <form onSubmit={onSubmit} className={styles.form} noValidate>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>Email address</span>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                disabled={submitting}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>Password</span>
              <div className={styles.passwordWrap}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                  disabled={submitting}
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </label>

            <div className={styles.row}>
              <label className={styles.remember}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className={styles.checkbox}
                  disabled={submitting}
                />
                <span>Remember me</span>
              </label>
              <a
                href="#"
                className={styles.forgotLink}
                onClick={(e) => e.preventDefault()}
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className={styles.submit}
              disabled={submitting}
              aria-busy={submitting}
            >
              {submitting ? 'Signing in…' : 'Sign In'}
            </button>

            {error && (
              <p role="alert" className={styles.error}>
                {error}
              </p>
            )}
          </form>

          <div className={styles.demo}>
            <p className={styles.demoTitle}>Demo access</p>
            <dl className={styles.demoList}>
              <div className={styles.demoRow}>
                <dt>Partner</dt>
                <dd>
                  <code>partner@auvault.com</code>
                  <span className={styles.demoSep}>/</span>
                  <code>partner123</code>
                </dd>
              </div>
              <div className={styles.demoRow}>
                <dt>Staff</dt>
                <dd>
                  <code>staff@auvault.com</code>
                  <span className={styles.demoSep}>/</span>
                  <code>staff123</code>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
