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

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
    content = <p className='errmsg'>{error?.data?.message}</p>
  }

  if (isSuccess) {
    const { ids } = tickets

    const ticketsArray = ids.map((id) => {
      return tickets.entities[id]
    })

    content = (
      <section className={styles.tickets}>
        <SearchBar
          item='Ticket'
          newItemPath='/tickets/new'
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <TicketList query={searchQuery} tickets={ticketsArray} />
      </section>
    )
  }

  return content
}

export default Tickets
