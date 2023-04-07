import { useState } from 'react'
import { api } from '@utils/api'

import styles from './Bookings.module.css'
import { Layout, SearchBar } from '@components/ui'
import BookingList from '@modules/bookings/BookingList/BookingList'

const Bookings = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const { data, isLoading, isSuccess, isError, error } =
    api.booking.getAll.useQuery()

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
          item='booking'
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
