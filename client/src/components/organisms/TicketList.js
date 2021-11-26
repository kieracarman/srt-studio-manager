import React, { Component } from 'react';
import { ChevronDown } from 'react-feather';
import axios from 'axios';

import TicketListItem from '../molecules/TicketListItem';

export default class TicketList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tickets: [],
      errors: {}
    }
  }

  // Starting lifecycle and calling for data from the database
  componentDidMount() {
    axios.get('/api/tickets/')
      .then(response => {
        // Create a holder array for data
        const list = response.data.slice()
        console.log(list);

        // Set users state to list
        this.setState({tickets: list});
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  listTickets() {
    return this.state.tickets.map((ticket) => {
      return(
        <TicketListItem
          key={ticket._id}
          createdAt={ticket.createdAt}
          title={ticket.title}
          author={ticket.author}
          status={ticket.status}
        />
      );
    })
  }

  render() {
    return (
      <div className='list'>
        <table>
          <thead className='list-header'>
            <tr>
              <th><a href='#'>Date<ChevronDown /></a></th>
              <th><a href='#'>Ticket<ChevronDown /></a></th>
              <th><a href='#'>Submitted by<ChevronDown /></a></th>
              <th><a href='#'>Status<ChevronDown /></a></th>
            </tr>
          </thead>
          <tbody>
            {this.listTickets()}
          </tbody>
        </table>
      </div>
    )
  }

};