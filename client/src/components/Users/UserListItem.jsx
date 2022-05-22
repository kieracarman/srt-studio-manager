import React from 'react';

import styles from './UserListItem.module.css';

const UserListItem = (props) => {
  return (
    <tr className={styles.listItem}>
      <td className='bold'>{props.username}</td>
      <td>{props.role}</td>
      <td>{props.accessLevel}</td>
    </tr>
  );
};

export default UserListItem;