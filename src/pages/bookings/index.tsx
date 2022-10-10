import { useState } from 'react'
import { trpc } from '@utils/trpc'

import styles from './Bookings.module.css'
import Layout from '@components/Layout/Layout'
import SearchBar from '@components/SearchBar/SearchBar'
import BookingList from '@modules/bookings/BookingList/BookingList'

const Bookings = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const { data, isLoading, isSuccess, isError, error } = trpc.useQuery([
    'booking.getAll'
  ])

  let content
  let bookingsList

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
    bookingsList = (
      <BookingList query={searchQuery} bookings={[]} error={error?.message} />
    )
  }

  if (isSuccess) {
    bookingsList = <BookingList query={searchQuery} bookings={data} />
  }

  content = (
    <Layout>
      <section className={styles.bookings}>
        <SearchBar
          item='Booking'
          newItemPath='/bookings/new'
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        {bookingsList}
      </section>
    </Layout>
  )

  return content
}

export default Bookings
