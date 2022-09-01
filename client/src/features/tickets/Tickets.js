import { useState } from 'react'

import styles from './Tickets.module.css'
import { SearchBar } from '../../components'
import { TicketList } from './components'
import { useGetTicketsQuery } from './ticketsApiSlice'

const Tickets = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const {
    data: tickets,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetTicketsQuery('ticketsList', {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  let content
  let ticketList

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
    ticketList = (
      <TicketList
        query={searchQuery}
        tickets={[]}
        error={error?.data?.message}
      />
    )
  }

  if (isSuccess) {
    const { ids } = tickets

    const ticketsArray = ids.map((id) => {
      return tickets.entities[id]
    })

    ticketList = <TicketList query={searchQuery} tickets={ticketsArray} />
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
