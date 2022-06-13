import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import styles from './Users.module.css';
import { getUsers } from '../../actions/users';
import { SearchBar } from '../../components';
import { UserList } from '../../components/Users';

const Users = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <section className={styles.users}>
      <SearchBar
        item='User'
        newItemPath='/users/new'
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <UserList query={searchQuery} />
    </section>
  );
};

export default Users;