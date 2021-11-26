import React from 'react';

const TicketListItem = ({ ...props }) => {
  return (
    <tr className='list-item'>
      <td>{props.createdAt}</td>
      <td>{props.title}</td>
      <td>{props.author}</td>
      <td>{props.status}</td>
    </tr>
  );
};

export default TicketListItem;