import { useState } from 'react'
import { api } from '@utils/api'

import styles from './Tickets.module.css'
import { Layout, SearchBar } from '@components/ui'
import TicketList from '@modules/tickets/TicketList/TicketList'

const Tickets = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const { data, isLoading, isSuccess, isError, error } =
    api.ticket.getAll.useQuery()

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
    <Layout>
      <section className={styles.tickets}>
        <SearchBar
          item='ticket'
          newItemPath='/tickets/new'
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        {ticketList}
      </section>
    </Layout>
  )

  return content
}

export default Tickets
