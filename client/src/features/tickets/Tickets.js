import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import styles from './Tickets.module.css'
import { getTickets } from '../../actions/tickets'
import { SearchBar } from '../../components'
import { TicketList } from './components'

const Tickets = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTickets())
  }, [])

  return (
    <section className={styles.tickets}>
      <SearchBar
        item='Ticket'
        newItemPath='/tickets/new'
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <TicketList query={searchQuery} />
    </section>
  )
}

export default Tickets
