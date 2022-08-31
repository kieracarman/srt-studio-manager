import { useState } from 'react'

import styles from './Bookings.module.css'
import { SearchBar } from '../../components'
import { BookingList } from './components'
import { useGetBookingsQuery } from './bookingsApiSlice'

const Bookings = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const {
    data: bookings,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetBookingsQuery('bookingsList', {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  let content

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
    content = <p className='errmsg'>{error?.data?.message}</p>
  }

  if (isSuccess) {
    const { ids } = bookings

    const bookingsArray = ids.map((id) => {
      return bookings.entities[id]
    })

    content = (
      <section className={styles.bookings}>
        <SearchBar
          item='Booking'
          newItemPath='/bookings/new'
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <BookingList query={searchQuery} bookings={bookingsArray} />
      </section>
    )
  }

  return content
}

export default Bookings
