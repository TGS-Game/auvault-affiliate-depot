import { useEffect, useRef, useState } from 'react'
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

type NavItem = {
  label: string
  to?: string
  dropdown?: { label: string; to: string }[]
}

const BUSINESS_ITEMS: { label: string; to: string }[] = [
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

const NAV: NavItem[] = [
  { label: 'HOME', to: '/' },
  { label: 'BUSINESS', dropdown: BUSINESS_ITEMS },
  // Stubs for parity with Figma — not wired to dedicated routes yet
  { label: 'CUSTOMER', to: '/' },
  { label: 'TRANSACTION', to: '/' },
  { label: 'RESOURCES', to: '/' },
]

const TABLET_BREAKPOINT = 1100

export default function Header() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const { role } = useRole()
  const [menuOpen, setMenuOpen] = useState(false)
  const [businessOpen, setBusinessOpen] = useState(false)
  const [mobileBusinessOpen, setMobileBusinessOpen] = useState(false)
  const [isCompact, setIsCompact] = useState<boolean>(() =>
    typeof window === 'undefined' ? false : window.innerWidth < TABLET_BREAKPOINT,
  )
  const closeTimer = useRef<number | null>(null)

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

  const openBusiness = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
    setBusinessOpen(true)
  }

  const scheduleCloseBusiness = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current)
    }
    closeTimer.current = window.setTimeout(() => {
      setBusinessOpen(false)
      closeTimer.current = null
    }, 300)
  }

  const handleSignOut = () => {
    setMenuOpen(false)
    logout()
    navigate('/login', { replace: true })
  }

  const handleBusinessClickCompact = () => {
    // tablet/mobile: clicking BUSINESS toggles
    if (isCompact) {
      setBusinessOpen((v) => !v)
    }
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
          {NAV.map((item) => {
            if (item.dropdown) {
              return (
                <div
                  key={item.label}
                  className={styles.navItemWrap}
                  onMouseEnter={isCompact ? undefined : openBusiness}
                  onMouseLeave={isCompact ? undefined : scheduleCloseBusiness}
                >
                  <button
                    type="button"
                    className={`${styles.navLink} ${styles.navLinkBtn}${businessOpen ? ' ' + styles.navLinkActive : ''}`}
                    onClick={handleBusinessClickCompact}
                    aria-haspopup="menu"
                    aria-expanded={businessOpen}
                  >
                    {item.label}
                    <ChevronDownIcon size={14} className={styles.navChevron} />
                  </button>

                  {/* invisible hover bridge so the cursor never falls between the trigger and the menu */}
                  {!isCompact && businessOpen && (
                    <span aria-hidden className={styles.bridge} />
                  )}

                  {businessOpen && !isCompact && (
                    <div
                      className={styles.dropdown}
                      role="menu"
                      onMouseEnter={openBusiness}
                      onMouseLeave={scheduleCloseBusiness}
                    >
                      <p className={styles.dropdownHeading}>Business</p>
                      {item.dropdown.map((sub) => (
                        <NavLink
                          key={sub.to}
                          to={sub.to}
                          className={({ isActive }) =>
                            `${styles.dropdownItem}${isActive ? ' ' + styles.dropdownItemActive : ''}`
                          }
                          onClick={() => setBusinessOpen(false)}
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
          {NAV.map((item) => {
            if (item.dropdown) {
              return (
                <div key={item.label} className={styles.drawerGroup}>
                  <button
                    type="button"
                    className={`${styles.drawerLink} ${styles.drawerGroupBtn}`}
                    onClick={() => setMobileBusinessOpen((v) => !v)}
                    aria-expanded={mobileBusinessOpen}
                  >
                    <span>{item.label}</span>
                    <ChevronDownIcon
                      size={16}
                      className={`${styles.drawerChevron}${mobileBusinessOpen ? ' ' + styles.drawerChevronOpen : ''}`}
                    />
                  </button>
                  {mobileBusinessOpen && (
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
