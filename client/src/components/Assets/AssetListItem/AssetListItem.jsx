import React from 'react';
import { Link } from 'react-router-dom';

import styles from './AssetListItem.module.css';

const AssetListItem = (props) => {
  return (
    <Link to={`/assets/${props.id}`} className={styles.listItem}>
      <td>{props.tagNumber}</td>
      <td className='bold'>{props.description}</td>
      <td>{props.make}</td>
      <td>{props.model}</td>
      <td>{props.location}</td>
      <td><span className={`${styles.statusTag} ${
        (props.status === 'in') ? styles.complete
        : (props.status === 'out') ? styles.inProgress
        : (props.status === 'lost') ? styles.pending
        : ''
      }`}>{props.status}</span></td>
    </Link>
  );
};

export default AssetListItem;