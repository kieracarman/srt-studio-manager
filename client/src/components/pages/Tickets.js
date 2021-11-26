import React from 'react';

import SearchBar from '../molecules/SearchBar';
import TicketList from '../organisms/TicketList';

const Tickets = () => (
  <div>
    <h1>Tickets</h1>
    <SearchBar item='Ticket' />
    <TicketList />
  </div>
);

export default Tickets;