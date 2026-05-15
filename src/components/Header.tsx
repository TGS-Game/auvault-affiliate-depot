import { useEffect, useMemo, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useRole } from '../context/RoleContext'
import {
  SettingsIcon,
  BellIcon,
  PersonIcon,
  ChevronDownIcon,
  GlobeIcon,
} from './icons'
import styles from './Header.module.css'

type DropdownItem = { label: string; to: string }

type NavItem = {
  label: string
  to?: string
  dropdown?: DropdownItem[]
  /** Identifier used to track which dropdown is open */
  key?: string
  /** Visual variant — 'staff' adds the burgundy indicator */
  variant?: 'default' | 'staff'
}

const BUSINESS_ITEMS: DropdownItem[] = [
  { label: 'Overview', to: '/business/overview' },
  { label: 'Downline', to: '/business/downline' },
  { label: 'New Business Partner', to: '/business/new-business-partner' },
  { label: 'Lock an Account', to: '/business/lock-an-account' },
  { label: 'Landing Page', to: '/business/landing-page' },
  { label: 'Account Balance', to: '/business/account-balance' },
  { label: 'Settlements', to: '/business/settlements' },
  { label: 'Conditions', to: '/business/conditions' },
  {
    label: 'Acquisition Commission',
    to: '/business/acquisition-commission',
  },
]

const STAFF_ITEMS: DropdownItem[] = [
  { label: 'All Partners', to: '/staff/partners' },
  { label: 'Approvals', to: '/staff/approvals' },
  { label: 'Bank Reconciliation', to: '/staff/bank-reconciliation' },
  { label: 'Reports', to: '/staff/reports' },
  { label: 'System', to: '/staff/system' },
]

const BASE_NAV: NavItem[] = [
  { label: 'HOME', to: '/' },
  { label: 'BUSINESS', dropdown: BUSINESS_ITEMS, key: 'business' },
  { label: 'CUSTOMER', to: '/customer' },
  { label: 'TRANSACTION', to: '/transaction' },
  { label: 'RESOURCES', to: '/resources' },
]

const STAFF_NAV_ITEM: NavItem = {
  label: 'STAFF',
  dropdown: STAFF_ITEMS,
  key: 'staff',
  variant: 'staff',
}

const TABLET_BREAKPOINT = 1100
const CLOSE_DELAY_MS = 300

export default function Header() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const { role, isStaff } = useRole()
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileOpenDropdowns, setMobileOpenDropdowns] = useState<Set<string>>(
    new Set(),
  )
  const [isCompact, setIsCompact] = useState<boolean>(() =>
    typeof window === 'undefined' ? false : window.innerWidth < TABLET_BREAKPOINT,
  )
  const closeTimer = useRef<number | null>(null)

  const navItems = useMemo<NavItem[]>(
    () => (isStaff ? [...BASE_NAV, STAFF_NAV_ITEM] : BASE_NAV),
    [isStaff],
  )

  useEffect(() => {
    const onResize = () => setIsCompact(window.innerWidth < TABLET_BREAKPOINT)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    return () => {
      if (closeTimer.current !== null) {
        window.clearTimeout(closeTimer.current)
      }
    }
  }, [])

  const openDropdownNow = (key: string) => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
    setOpenDropdown(key)
  }

  const scheduleClose = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current)
    }
    closeTimer.current = window.setTimeout(() => {
      setOpenDropdown(null)
      closeTimer.current = null
    }, CLOSE_DELAY_MS)
  }

  const handleSignOut = () => {
    setMenuOpen(false)
    logout()
    navigate('/login', { replace: true })
  }

  const handleDropdownClickCompact = (key: string) => {
    if (isCompact) {
      setOpenDropdown((v) => (v === key ? null : key))
    }
  }

  const toggleMobileDropdown = (key: string) => {
    setMobileOpenDropdowns((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <button
          className={`${styles.hamburger}${menuOpen ? ' ' + styles.hamburgerOpen : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span aria-hidden />
          <span aria-hidden />
          <span aria-hidden />
        </button>

        <NavLink className={styles.logo} to="/" aria-label="AuVault">
          <span className={styles.logoText}>
            au<span className={styles.logoVault}>vault</span>
          </span>
        </NavLink>

        <nav className={styles.nav} aria-label="Primary">
          {navItems.map((item) => {
            if (item.dropdown && item.key) {
              const isOpen = openDropdown === item.key
              const isStaffVariant = item.variant === 'staff'
              return (
                <div
                  key={item.label}
                  className={styles.navItemWrap}
                  onMouseEnter={
                    isCompact ? undefined : () => openDropdownNow(item.key!)
                  }
                  onMouseLeave={isCompact ? undefined : scheduleClose}
                >
                  <button
                    type="button"
                    className={`${styles.navLink} ${styles.navLinkBtn}${isOpen ? ' ' + styles.navLinkActive : ''}${isStaffVariant ? ' ' + styles.navLinkStaff : ''}`}
                    onClick={() => handleDropdownClickCompact(item.key!)}
                    aria-haspopup="menu"
                    aria-expanded={isOpen}
                  >
                    {item.label}
                    <ChevronDownIcon size={14} className={styles.navChevron} />
                  </button>

                  {!isCompact && isOpen && (
                    <span aria-hidden className={styles.bridge} />
                  )}

                  {isOpen && !isCompact && (
                    <div
                      className={`${styles.dropdown}${isStaffVariant ? ' ' + styles.dropdownStaff : ''}`}
                      role="menu"
                      onMouseEnter={() => openDropdownNow(item.key!)}
                      onMouseLeave={scheduleClose}
                    >
                      <p className={styles.dropdownHeading}>
                        {item.label.toLowerCase()}
                      </p>
                      {item.dropdown.map((sub) => (
                        <NavLink
                          key={sub.to}
                          to={sub.to}
                          className={({ isActive }) =>
                            `${styles.dropdownItem}${isActive ? ' ' + styles.dropdownItemActive : ''}`
                          }
                          onClick={() => setOpenDropdown(null)}
                          role="menuitem"
                        >
                          {sub.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              )
            }
            return (
              <NavLink
                key={item.label}
                to={item.to!}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `${styles.navLink}${isActive ? ' ' + styles.navLinkActive : ''}`
                }
              >
                {item.label}
              </NavLink>
            )
          })}
        </nav>

        <div className={styles.icons}>
          <button className={styles.iconBtn} aria-label="Settings">
            <SettingsIcon />
          </button>
          <button className={styles.iconBtn} aria-label="Notifications">
            <BellIcon />
          </button>
          <button className={styles.iconBtn} aria-label="Account">
            <PersonIcon />
          </button>
          <button className={styles.iconBtn} aria-label="Language: English">
            <GlobeIcon />
          </button>
          <button type="button" className={styles.signout} onClick={handleSignOut}>
            Sign Out
          </button>
          {role && (
            <span
              className={`${styles.rolePill} ${role === 'staff' ? styles.rolePillStaff : styles.rolePillPartner}`}
              aria-label={`Current role: ${role}`}
            >
              {role.toUpperCase()}
            </span>
          )}
        </div>
      </div>

      <div
        className={`${styles.drawer}${menuOpen ? ' ' + styles.drawerOpen : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav className={styles.drawerNav} aria-label="Mobile">
          {navItems.map((item) => {
            if (item.dropdown && item.key) {
              const isOpen = mobileOpenDropdowns.has(item.key)
              const isStaffVariant = item.variant === 'staff'
              return (
                <div key={item.label} className={styles.drawerGroup}>
                  <button
                    type="button"
                    className={`${styles.drawerLink} ${styles.drawerGroupBtn}${isStaffVariant ? ' ' + styles.drawerLinkStaff : ''}`}
                    onClick={() => toggleMobileDropdown(item.key!)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.label}</span>
                    <ChevronDownIcon
                      size={16}
                      className={`${styles.drawerChevron}${isOpen ? ' ' + styles.drawerChevronOpen : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <div className={styles.drawerSubgroup}>
                      {item.dropdown.map((sub) => (
                        <NavLink
                          key={sub.to}
                          to={sub.to}
                          className={({ isActive }) =>
                            `${styles.drawerSubLink}${isActive ? ' ' + styles.drawerSubLinkActive : ''}`
                          }
                          onClick={() => setMenuOpen(false)}
                        >
                          {sub.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              )
            }
            return (
              <NavLink
                key={item.label}
                to={item.to!}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `${styles.drawerLink}${isActive ? ' ' + styles.drawerLinkActive : ''}`
                }
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            )
          })}

          <div className={styles.drawerIcons}>
            <button className={styles.iconBtn} aria-label="Settings">
              <SettingsIcon />
            </button>
            <button className={styles.iconBtn} aria-label="Notifications">
              <BellIcon />
            </button>
            <button className={styles.iconBtn} aria-label="Account">
              <PersonIcon />
            </button>
            <button className={styles.iconBtn} aria-label="Language">
              <GlobeIcon />
            </button>
          </div>

          {role && (
            <span
              className={`${styles.rolePill} ${styles.rolePillDrawer} ${role === 'staff' ? styles.rolePillStaff : styles.rolePillPartner}`}
              aria-label={`Current role: ${role}`}
            >
              {role.toUpperCase()}
            </span>
          )}

          <button
            type="button"
            className={`${styles.signout} ${styles.signoutDrawer}`}
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </nav>
      </div>

      {menuOpen && (
        <button
          type="button"
          className={styles.scrim}
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  )
}
