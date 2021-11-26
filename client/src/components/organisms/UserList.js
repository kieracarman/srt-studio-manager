import React, { Component } from 'react';
import { ChevronDown } from 'react-feather';
import axios from 'axios';

import UserListItem from '../molecules/UserListItem';

export default class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      errors: {}
    }
  }

  // Starting lifecycle and calling for data from the database
  componentDidMount() {
    axios.get('/api/auth/')
      .then(response => {
        // Create a holder array for data
        const list = response.data.slice()
        console.log(list);

        // Set users state to list
        this.setState({users: list});
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  listUsers() {
    return this.state.users.map((user) => {
      return(
        <UserListItem
          key={user._id}
          username={user.username}
          role={user.role}
          accessLevel={user.accessLevel}
        />
      );
    })
  }

  render() {
    return (
      <div className='user-list'>
        <table>
          <thead className='user-list-header'>
            <tr>
              <th><a href='#'>ID<ChevronDown /></a></th>
              <th><a href='#'>Name<ChevronDown /></a></th>
              <th><a href='#'>Role<ChevronDown /></a></th>
            </tr>
          </thead>
          <tbody className='user-list-items'>
            {this.listUsers()}
          </tbody>
        </table>
      </div>
    )
  }

};