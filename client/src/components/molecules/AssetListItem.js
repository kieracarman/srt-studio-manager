import React from 'react';

const AssetListItem = ({ ...props }) => {
  return (
    <tr className='list-item'>
      <td>{props.tagNumber}</td>
      <td>{props.make}</td>
      <td>{props.model}</td>
      <td>{props.description}</td>
      <td>{props.location}</td>
      <td><span className={`status-tag ${
        (props.status === 'in') ? 'complete'
        : (props.status === 'out') ? 'in-progress'
        : (props.status === 'lost') ? 'pending'
        : ''
      }`}>{props.status}</span></td>
    </tr>
  );
};

export default AssetListItem;