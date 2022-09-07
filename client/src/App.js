import { Routes, Route } from 'react-router-dom'

import './App.css'
import { Layout, Modal } from './components'
import { Login, Prefetch, PersistLogin, RequireAuth } from './features/auth'
import { Dashboard, Assets, Bookings, Tickets, Users } from './features'
import { EditAsset, NewAsset } from './features/assets/components'
import { EditUser, NewUser } from './features/users/components'
import { EditTicket, NewTicket } from './features/tickets/components'
import { EditBooking, NewBooking } from './features/bookings/components'
import { Student } from './features/student/'
import { ROLES } from './config/roles'
import useAuth from './hooks/useAuth'

const App = () => {
  const { role } = useAuth()

  let routes

  if (role === ROLES.admin || role === ROLES.supervisor) {
    routes = (
      <Route element={<PersistLogin />}>
        <Route
          element={
            <RequireAuth allowedRoles={[ROLES.admin, ROLES.supervisor]} />
          }
        >
          <Route element={<Prefetch />}>
            <Route path='/' element={<Layout />}>
              <Route index element={<Dashboard />} />

              <Route path='assets'>
                <Route index element={<Assets />} />
                <Route
                  path=':id'
                  element={
                    <Modal onClose='/assets'>
                      <EditAsset />
                    </Modal>
                  }
                />
                <Route
                  path='new'
                  element={
                    <Modal onClose='/assets'>
                      <NewAsset />
                    </Modal>
                  }
                />
              </Route>

              <Route path='users'>
                <Route index element={<Users />} />
                <Route
                  path=':id'
                  element={
                    <Modal onClose='/users'>
                      <EditUser />
                    </Modal>
                  }
                />
                <Route
                  path='new'
                  element={
                    <Modal onClose='/users'>
                      <NewUser />
                    </Modal>
                  }
                />
              </Route>

              <Route path='tickets'>
                <Route index element={<Tickets />} />
                <Route
                  path=':id'
                  element={
                    <Modal onClose='/tickets'>
                      <EditTicket />
                    </Modal>
                  }
                />
                <Route
                  path='new'
                  element={
                    <Modal onClose='/tickets'>
                      <NewTicket />
                    </Modal>
                  }
                />
              </Route>

              <Route path='bookings'>
                <Route index element={<Bookings />} />
                <Route
                  path=':id'
                  element={
                    <Modal onClose='/bookings'>
                      <EditBooking />
                    </Modal>
                  }
                />
                <Route
                  path='new'
                  element={
                    <Modal onClose='/bookings'>
                      <NewBooking />
                    </Modal>
                  }
                />
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    )
  } else {
    routes = (
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth allowedRoles={[ROLES.basic]} />}>
          <Route path='/' element={<Student />} />
        </Route>
      </Route>
    )
  }

  return (
    <Routes>
      <Route path='login' element={<Login />} />

      {routes}
    </Routes>
  )
}

export default App
