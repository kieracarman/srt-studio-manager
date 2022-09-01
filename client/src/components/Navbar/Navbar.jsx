import { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  Activity,
  List,
  Users,
  AlertCircle,
  Calendar,
  LogOut
} from 'react-feather'

import styles from './Navbar.module.css'
import { useSendLogoutMutation } from '../../features/auth/authApiSlice'

const items = [
  { path: '', name: 'Dashboard', icon: <Activity /> },
  { path: 'assets', name: 'Assets', icon: <List /> },
  { path: 'users', name: 'Users', icon: <Users /> },
  { path: 'tickets', name: 'Tickets', icon: <AlertCircle /> },
  { path: 'bookings', name: 'Bookings', icon: <Calendar /> }
]

const Navbar = () => {
  const navigate = useNavigate()

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation()

  useEffect(() => {
    if (isSuccess) navigate('/login')
  }, [isSuccess, navigate])

  const handleLogout = () => sendLogout()

  if (isLoading) return <p>Logging out...</p>
  if (isError) return <p>Error: {error.data?.message}</p>

  const content = (
    <section className={styles.navbar}>
      {items.map((item) => (
        <NavLink
          key={item.name}
          end
          to={`/${item.path}`}
          className={({ isActive }) =>
            styles.navbarLink + (isActive ? ` ${styles.navbarLinkActive}` : '')
          }
        >
          {item.icon}
          {item.name}
        </NavLink>
      ))}

      <button
        className={styles.navbarLink}
        title='Logout'
        onClick={handleLogout}
      >
        <LogOut />
        Logout
      </button>
    </section>
  )

  return content
}

export default Navbar
