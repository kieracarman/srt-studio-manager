import React from 'react';

const UserListItem = ({ ...props }) => {
  return (
    <tr className='list-item'>
      <td>{props.username}</td>
      <td>{props.role}</td>
    </tr>
  );
};

export default UserListItem;