import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import styles from './Bookings.module.css'
import { getBookings } from '../../actions/bookings'
import { SearchBar } from '../../components'
import { BookingList } from '../../components/Bookings'

const Bookings = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBookings())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
