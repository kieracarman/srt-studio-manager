import {
  Activity,
  List,
  Users,
  AlertCircle,
  Calendar,
  LogOut
} from 'react-feather'

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
    <section className='m-0 grid grid-cols-6 place-items-center border-t border-t-gray-200 p-0 text-center md:h-full md:grid-cols-1 md:grid-rows-[auto_auto_auto_auto_auto_1fr_auto] md:border-r md:border-t-0 md:border-r-gray-200 xl:w-60'>
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
