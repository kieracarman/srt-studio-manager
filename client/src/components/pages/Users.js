import React from 'react';

import SearchBar from '../molecules/SearchBar';
import UserList from '../organisms/UserList';

const Users = () => (
  <div>
    <h1>Users</h1>
    <SearchBar item='User' />
    <UserList />
  </div>
);

export default Users;