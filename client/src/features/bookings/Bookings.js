import { useState } from 'react'

import styles from './Bookings.module.css'
import { SearchBar } from '../../components'
import { BookingList } from './components'

const Bookings = () => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <section className={styles.bookings}>
      <SearchBar
        item='Booking'
        newItemPath='/bookings/new'
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <BookingList query={searchQuery} />
    </section>
  )
}

export default Bookings
