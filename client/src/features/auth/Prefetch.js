import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { store } from '../../app/store'
import { assetsApiSlice } from '../assets/assetsApiSlice'
import { bookingsApiSlice } from '../bookings/bookingsApiSlice'
import { ticketsApiSlice } from '../tickets/ticketsApiSlice'
import { usersApiSlice } from '../users/usersApiSlice'

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(
      assetsApiSlice.util.prefetch('getAssets', 'assetsList', { force: true })
    )
    store.dispatch(
      bookingsApiSlice.util.prefetch('getBookings', 'bookingsList', {
        force: true
      })
    )
    store.dispatch(
      ticketsApiSlice.util.prefetch('getTickets', 'ticketsList', {
        force: true
      })
    )
    store.dispatch(
      usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true })
    )
  }, [])

  return <Outlet />
}

export default Prefetch
