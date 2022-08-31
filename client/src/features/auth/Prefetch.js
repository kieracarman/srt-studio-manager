import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { store } from '../../app/store'
import { assetsApiSlice } from '../assets/assetsApiSlice'
import { bookingsApiSlice } from '../bookings/bookingsApiAlice'
import { ticketsApiSlice } from '../tickets/ticketsApiSlice'
import { usersApiSlice } from '../users/usersApiSlice'

const Prefetch = () => {
  useEffect(() => {
    console.log('subscribing')
    const assets = store.dispatch(assetsApiSlice.endpoints.getAssets.initiate())
    const bookings = store.dispatch(
      bookingsApiSlice.endpoints.getBookings.initiate()
    )
    const tickets = store.dispatch(
      ticketsApiSlice.endpoints.getTickets.initiate()
    )
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

    return () => {
      console.log('unsubscribing')
      assets.unsubscribe()
      bookings.unsubscribe()
      tickets.unsubscribe()
      users.unsubscribe()
    }
  }, [])

  return <Outlet />
}

export default Prefetch
