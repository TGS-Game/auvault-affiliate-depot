import { useState, type FormEvent } from 'react'
import Card from '../../components/Card'
import PageHeader from '../../components/PageHeader'
import { useToast } from '../../context/ToastContext'
import business from '../Business/Business.module.css'
import styles from './Staff.module.css'

type StaffRole = 'Admin' | 'Staff' | 'Support'
type StaffStatus = 'Active' | 'Suspended'

type StaffUser = {
  id: number
  name: string
  email: string
  role: StaffRole
  lastLogin: string
  status: StaffStatus
}

type Tariff = {
  code: string
  name: string
  setupFee: string
  monthlyFee: string
  acquisitionPct: string
  recurringPct: string
}

type ToggleKey = 'newCustomer' | 'validationApproved' | 'largeTransaction' | 'settlementDue' | 'newPartner'

type ToggleSetting = {
  key: ToggleKey
  label: string
  email: boolean
  sms: boolean
}

const INITIAL_USERS: StaffUser[] = [
  { id: 1, name: 'Admin User', email: 'admin@abcbullion.com', role: 'Admin', lastLogin: 'Today', status: 'Active' },
  { id: 2, name: 'Sarah Operations', email: 'sarah@abcbullion.com', role: 'Staff', lastLogin: 'Yesterday', status: 'Active' },
  { id: 3, name: 'Mark Compliance', email: 'mark@abcbullion.com', role: 'Staff', lastLogin: '3 days ago', status: 'Active' },
  { id: 4, name: 'James Support', email: 'james@abcbullion.com', role: 'Support', lastLogin: '1 week ago', status: 'Active' },
]

const INITIAL_TARIFFS: Tariff[] = [
  { code: 'M-6', name: 'Standard 6 Month', setupFee: '€150', monthlyFee: '€25', acquisitionPct: '3.0%', recurringPct: '0.6%' },
  { code: 'M-12', name: 'Standard 12 Month', setupFee: '€200', monthlyFee: '€20', acquisitionPct: '3.5%', recurringPct: '0.7%' },
  { code: 'M-24', name: 'Premium 24 Month', setupFee: '€300', monthlyFee: '€18', acquisitionPct: '4.0%', recurringPct: '0.8%' },
  { code: 'M-VIP', name: 'VIP Account', setupFee: '€500', monthlyFee: '€15', acquisitionPct: '5.0%', recurringPct: '1.0%' },
]

const INITIAL_TOGGLES: ToggleSetting[] = [
  { key: 'newCustomer', label: 'New customer registration', email: true, sms: true },
  { key: 'validationApproved', label: 'Customer validation approved', email: true, sms: true },
  { key: 'largeTransaction', label: 'Large transaction alert (>€50k)', email: true, sms: true },
  { key: 'settlementDue', label: 'Settlement due', email: true, sms: true },
  { key: 'newPartner', label: 'New partner application', email: true, sms: true },
]

export default function StaffSystem() {
  const { showToast } = useToast()
  const [users, setUsers] = useState<StaffUser[]>(INITIAL_USERS)
  const [showAddUser, setShowAddUser] = useState(false)
  const [newUser, setNewUser] = useState<{ name: string; email: string; role: StaffRole }>({
    name: '',
    email: '',
    role: 'Staff',
  })

  const [tariffs, setTariffs] = useState<Tariff[]>(INITIAL_TARIFFS)
  const [editingTariff, setEditingTariff] = useState<string | null>(null)
  const [tariffDraft, setTariffDraft] = useState<Tariff | null>(null)

  const [toggles, setToggles] = useState<ToggleSetting[]>(INITIAL_TOGGLES)

  const handleAddUser = (e: FormEvent) => {
    e.preventDefault()
    if (!newUser.name.trim() || !newUser.email.trim()) return
    const nextId = (users.at(-1)?.id ?? 0) + 1
    setUsers((prev) => [
      ...prev,
      {
        id: nextId,
        name: newUser.name.trim(),
        email: newUser.email.trim(),
        role: newUser.role,
        lastLogin: '—',
        status: 'Active',
      },
    ])
    setNewUser({ name: '', email: '', role: 'Staff' })
    setShowAddUser(false)
    showToast(`Added ${newUser.name.trim()}`, 'success')
  }

  const startTariffEdit = (t: Tariff) => {
    setEditingTariff(t.code)
    setTariffDraft({ ...t })
  }

  const saveTariff = () => {
    if (!tariffDraft) return
    setTariffs((prev) =>
      prev.map((t) => (t.code === tariffDraft.code ? tariffDraft : t)),
    )
    setEditingTariff(null)
    setTariffDraft(null)
    showToast('Tariff updated', 'success')
  }

  const cancelTariff = () => {
    setEditingTariff(null)
    setTariffDraft(null)
  }

  const toggleSetting = (key: ToggleKey, channel: 'email' | 'sms') => {
    setToggles((prev) =>
      prev.map((t) => (t.key === key ? { ...t, [channel]: !t[channel] } : t)),
    )
  }

  return (
    <div className={styles.page}>
      <PageHeader title="System" subtitle="User accounts, tariffs and notification routing" />

      <Card
        title="USER MANAGEMENT"
        toolbar={
          <button
            type="button"
            className={`${styles.rowBtn} ${styles.rowBtnGold}`}
            onClick={() => setShowAddUser(true)}
          >
            + Add User
          </button>
        }
      >
        <div className={business.tableWrap}>
          <table className={business.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Last Login</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className={styles.tierPill}>{u.role}</span>
                  </td>
                  <td>{u.lastLogin}</td>
                  <td>
                    <span
                      className={`${business.statusBadge} ${u.status === 'Active' ? business.statusActive : business.statusLocked}`}
                    >
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="TARIFF MANAGEMENT">
        <div className={business.tableWrap}>
          <table className={business.table}>
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Setup Fee</th>
                <th>Monthly Fee</th>
                <th>Acquisition %</th>
                <th>Recurring %</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tariffs.map((t) => {
                const isEditing = editingTariff === t.code && tariffDraft
                return (
                  <tr key={t.code}>
                    <td>{t.code}</td>
                    <td>
                      {isEditing ? (
                        <input
                          className={styles.editableInput}
                          value={tariffDraft!.name}
                          onChange={(e) =>
                            setTariffDraft({ ...tariffDraft!, name: e.target.value })
                          }
                        />
                      ) : (
                        t.name
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          className={styles.editableInput}
                          value={tariffDraft!.setupFee}
                          onChange={(e) =>
                            setTariffDraft({ ...tariffDraft!, setupFee: e.target.value })
                          }
                        />
                      ) : (
                        t.setupFee
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          className={styles.editableInput}
                          value={tariffDraft!.monthlyFee}
                          onChange={(e) =>
                            setTariffDraft({ ...tariffDraft!, monthlyFee: e.target.value })
                          }
                        />
                      ) : (
                        t.monthlyFee
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          className={styles.editableInput}
                          value={tariffDraft!.acquisitionPct}
                          onChange={(e) =>
                            setTariffDraft({ ...tariffDraft!, acquisitionPct: e.target.value })
                          }
                        />
                      ) : (
                        t.acquisitionPct
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          className={styles.editableInput}
                          value={tariffDraft!.recurringPct}
                          onChange={(e) =>
                            setTariffDraft({ ...tariffDraft!, recurringPct: e.target.value })
                          }
                        />
                      ) : (
                        t.recurringPct
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <span className={styles.rowActions}>
                          <button
                            type="button"
                            className={`${styles.rowBtn} ${styles.rowBtnGold}`}
                            onClick={saveTariff}
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            className={`${styles.rowBtn} ${styles.rowBtnGoldOutline}`}
                            onClick={cancelTariff}
                          >
                            Cancel
                          </button>
                        </span>
                      ) : (
                        <button
                          type="button"
                          className={`${styles.rowBtn} ${styles.rowBtnGoldOutline}`}
                          onClick={() => startTariffEdit(t)}
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="NOTIFICATION SETTINGS">
        <ul className={styles.toggleList}>
          {toggles.map((t) => (
            <li key={t.key} className={styles.toggleRow}>
              <span className={styles.toggleLabel}>{t.label}</span>
              <span className={styles.toggleGroup}>
                <button
                  type="button"
                  className={`${styles.toggle}${t.email ? ' ' + styles.toggleOn : ''}`}
                  onClick={() => toggleSetting(t.key, 'email')}
                  aria-pressed={t.email}
                  aria-label={`${t.label} email`}
                >
                  <span className={styles.toggleKey}>Email</span>
                  <span className={styles.toggleSwitch} aria-hidden />
                </button>
                <button
                  type="button"
                  className={`${styles.toggle}${t.sms ? ' ' + styles.toggleOn : ''}`}
                  onClick={() => toggleSetting(t.key, 'sms')}
                  aria-pressed={t.sms}
                  aria-label={`${t.label} SMS`}
                >
                  <span className={styles.toggleKey}>SMS</span>
                  <span className={styles.toggleSwitch} aria-hidden />
                </button>
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {showAddUser && (
        <div
          className={styles.modalScrim}
          role="dialog"
          aria-modal="true"
          aria-labelledby="addUserTitle"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowAddUser(false)
          }}
        >
          <form
            className={styles.modal}
            onSubmit={handleAddUser}
          >
            <button
              type="button"
              className={styles.modalClose}
              onClick={() => setShowAddUser(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 id="addUserTitle" className={styles.modalTitle}>
              Add User
            </h2>

            <div className={business.form}>
              <div className={business.field}>
                <label className={business.fieldLabel} htmlFor="newUserName">
                  Name
                </label>
                <input
                  id="newUserName"
                  className={business.input}
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  required
                />
              </div>
              <div className={business.field}>
                <label className={business.fieldLabel} htmlFor="newUserEmail">
                  Email
                </label>
                <input
                  id="newUserEmail"
                  type="email"
                  className={business.input}
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  required
                />
              </div>
              <div className={business.field}>
                <label className={business.fieldLabel} htmlFor="newUserRole">
                  Role
                </label>
                <select
                  id="newUserRole"
                  className={business.select}
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value as StaffRole })
                  }
                >
                  <option value="Admin">Admin</option>
                  <option value="Staff">Staff</option>
                  <option value="Support">Support</option>
                </select>
              </div>
            </div>

            <div className={styles.modalActions}>
              <button
                type="button"
                className={business.btnSecondary}
                onClick={() => setShowAddUser(false)}
              >
                Cancel
              </button>
              <button type="submit" className={business.btnPrimary}>
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
