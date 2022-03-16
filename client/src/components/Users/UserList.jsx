import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'react-feather';
import axios from 'axios';

import UserListItem from './UserListItem';

const UserList = (props) => {
  const [users, setUsers] = useState([]);

  // Starting lifecycle and calling for data from the database
  useEffect(() => {
    axios.get('/api/auth/')
      .then(response => {
        // Create a holder array for data
        const list = response.data.slice()

        // Set users state to list
        setUsers(list);
      })
      .catch(function (error) {
        console.log(error);
      })
    });

  const listUsers = () => (
    users.map((user) => {
      return(
        <UserListItem
          key={user._id}
          username={user.username}
          role={user.role}
          accessLevel={user.accessLevel}
        />
      );
    })
  );

  return (
    <div className='list'>
      <table>
        <thead className='list-header'>
          <tr>
            <th><a href='#'>Username<ChevronDown /></a></th>
            <th><a href='#'>Role<ChevronDown /></a></th>
            <th><a href='#'>Access Level<ChevronDown /></a></th>
          </tr>
        </thead>
        <tbody>
          {listUsers()}
        </tbody>
      </table>
    </div>
  )
};

export default UserList;