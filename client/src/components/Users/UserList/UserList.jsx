import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ChevronDown, ChevronUp } from 'react-feather';

import styles from './UserList.module.css';
import { UserListItem } from '../';

const UserList = (props) => {
  const { users, isLoading } = useSelector((state) => state.auth);
  const [ sort, setSort ] = useState({});

  const sortedUsers = useMemo(() => {
    let sortedUsers = [...users];
    if (sort.direction !== '') {
      sortedUsers.sort((a, b) => {
        if (a[sort.key] < b[sort.key]) {
          return sort.direction === 'ascending' ? -1 : 1;
        }
        if (a[sort.key] > b[sort.key]) {
          return sort.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedUsers;
  }, [users, sort]);

  const requestSort = key => {
    let direction = 'ascending';
    if (sort.key === key && sort.direction === 'ascending') {
      direction = 'descending';
    } else if (sort.key === key && sort.direction === 'descending') {
      direction = '';
    }
    setSort({ key, direction });
  };

  const sortArrow = key => {
    if (key === sort.key) {
      return sort.direction === 'ascending' ? <ChevronDown /> :
        sort.direction === 'descending' ? <ChevronUp /> : '';
    };
  };

  const filterArray = array => {
    return array.filter(item => {
      return props.query !== '' ? (
        [
          item._id,
          item.username
        ].join(' ')
          .toString()
          .toLowerCase()
          .indexOf(props.query.toLowerCase()) > -1
      ) : true;
    });
  };

  const listUsers = () => {
    return filterArray(sortedUsers).map((user) => {
      return(
        <UserListItem
          key={user._id}
          username={user.username}
          role={user.role}
          accessLevel={user.accessLevel}
        />
      );
    });
  };

  return (
    <table className={styles.list}>
      <thead>
        <tr>
          <th onClick={() => requestSort('username')}>Username{sortArrow('username')}</th>
          <th onClick={() => requestSort('role')}>Role{sortArrow('role')}</th>
          <th onClick={() => requestSort('accessLevel')}>Access Level{sortArrow('accessLevel')}</th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? <tr><td>Loading...</td></tr> : listUsers()}
      </tbody>
    </table>
  )
};

export default UserList;