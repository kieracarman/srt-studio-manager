import React from 'react';
import { Link } from 'react-router-dom';

const AssetListItem = (props) => {
  return (
    <Link to={`/assets/${props.id}`} className='list-item'>
      <td>{props.tagNumber}</td>
      <td className='bold'>{props.description}</td>
      <td>{props.make}</td>
      <td>{props.model}</td>
      <td>{props.location}</td>
      <td><span className={`status-tag ${
        (props.status === 'in') ? 'complete'
        : (props.status === 'out') ? 'in-progress'
        : (props.status === 'lost') ? 'pending'
        : ''
      }`}>{props.status}</span></td>
    </Link>
  );
};

export default AssetListItem;