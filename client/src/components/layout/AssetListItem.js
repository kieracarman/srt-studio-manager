import React from 'react';

const AssetListItem = ({ ...props }) => {
  return (
    <tr className='asset-list-item'>
      <td>{props.tagNumber}</td>
      <td>{props.make}</td>
      <td>{props.model}</td>
      <td>{props.description}</td>
      <td>{props.location}</td>
      <td>{props.status}</td>
    </tr>
  );
};

export default AssetListItem;