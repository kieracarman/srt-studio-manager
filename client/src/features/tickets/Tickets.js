import { useState } from 'react'

import styles from './Tickets.module.css'
import { SearchBar } from '../../components'
import { TicketList } from './components'

const Tickets = () => {
  const [searchQuery, setSearchQuery] = useState('')

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
