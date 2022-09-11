import { useState } from 'react'
import { trpc } from '@utils/trpc'

import styles from './Tickets.module.css'
import SearchBar from '@components/SearchBar/SearchBar'
import TicketList from '@modules/tickets/TicketList/TicketList'

const Tickets = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const { data, isLoading, isSuccess, isError, error } = trpc.useQuery([
    'ticket.getAll'
  ])

  let content
  let ticketList

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
    ticketList = (
      <TicketList query={searchQuery} tickets={[]} error={error?.message} />
    )
  }

  if (isSuccess) {
    ticketList = <TicketList query={searchQuery} tickets={data} />
  }

  content = (
    <section className={styles.tickets}>
      <SearchBar
        item='Ticket'
        newItemPath='/tickets/new'
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {ticketList}
    </section>
  )

  return content
}

export default Tickets
