import {
  Activity,
  List,
  Users,
  AlertCircle,
  Calendar,
  LogOut
} from 'react-feather'

import styles from './Navbar.module.css'
import { NavLink } from '@components/ui'

const items = [
  { path: '', name: 'Dashboard', icon: <Activity /> },
  { path: 'assets', name: 'Assets', icon: <List /> },
  { path: 'users', name: 'Users', icon: <Users /> },
  { path: 'tickets', name: 'Tickets', icon: <AlertCircle /> },
  { path: 'bookings', name: 'Bookings', icon: <Calendar /> },
  { path: 'api/auth/signout', name: 'Log out', icon: <LogOut /> }
]

const Navbar = () => {
  const content = (
    <section className={styles.navbar}>
      {items.map((item) => (
        <NavLink key={item.name} href={`/${item.path}`}>
          {item.icon}
          {item.name}
        </NavLink>
      ))}
    </section>
  )

  return content
}

export default Navbar
