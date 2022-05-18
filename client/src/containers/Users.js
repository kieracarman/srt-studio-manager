import React from 'react';

import { SearchBar } from '../components';
import UserList from '../components/Users/UserList';

const Users = () => (
  <>
    <h1>Users</h1>
    <SearchBar item='User' />
    <UserList />
  </>
);

export default Users;