import React from 'react';

import SearchBar from '../components/SearchBar';
import UserList from '../components/Users/UserList';

const Users = () => (
  <div>
    <h1>Users</h1>
    <SearchBar item='User' />
    <UserList />
  </div>
);

export default Users;