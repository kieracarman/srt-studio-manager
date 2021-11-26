import React from 'react';

const TicketListItem = ({ ...props }) => {
  return (
    <tr className='list-item'>
      <td>{props.createdAt}</td>
      <td>{props.title}</td>
      <td>{props.author}</td>
      <td><span className={`status-tag ${
        (props.status === 'pending') ? 'pending'
        : (props.status === 'in progress') ? 'in-progress'
        : (props.status === 'complete') ? 'complete'
        : ''
      }`}>{props.status}</span></td>
    </tr>
  );
};

export default TicketListItem;