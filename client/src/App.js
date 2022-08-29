import { Routes, Route, Navigate } from 'react-router-dom'

import './App.css'
import { Dashboard, Login, Assets, Users, Tickets, Bookings } from './features'
import { Layout, PrivateRoute, Modal } from './components'
import { EditAsset } from './features/assets/components'
import { EditUser } from './features/users/components'
import { EditTicket } from './features/tickets/components'
import { EditBooking } from './features/bookings/components'

const App = () => {
  return (
    <Routes>
      <Route
        path='login'
        element={
          localStorage.jwtToken ? <Navigate to='/' replace /> : <Login />
        }
      />

      {/* Protected routes */}
      <Route path='/' element={<PrivateRoute />}>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Dashboard />} />

          {/* Asset routes */}
          <Route
            path='assets/:id'
            element={
              <Modal onClose='/assets'>
                <EditAsset />
              </Modal>
            }
          />
          <Route path='assets' element={<Assets />} />

          {/* User routes */}
          <Route
            path='users/:id'
            element={
              <Modal onClose='/users'>
                <EditUser />
              </Modal>
            }
          />
          <Route path='users' element={<Users />} />

          {/* Ticket routes */}
          <Route
            path='tickets/:id'
            element={
              <Modal onClose='/tickets'>
                <EditTicket />
              </Modal>
            }
          />
          <Route path='tickets' element={<Tickets />} />

          {/* Booking routes */}
          <Route
            path='bookings/:id'
            element={
              <Modal onClose='/bookings'>
                <EditBooking />
              </Modal>
            }
          />
          <Route path='bookings' element={<Bookings />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
