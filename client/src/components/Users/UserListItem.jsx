import React from 'react';

const UserListItem = (props) => {
  return (
    <tr className='list-item'>
      <td className='bold'>{props.username}</td>
      <td>{props.role}</td>
      <td>{props.accessLevel}</td>
    </tr>
  );
};

export default UserListItem;