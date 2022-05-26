import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './AssetListItem.module.css';

const AssetListItem = (props) => {
  const navigate = useNavigate();

  return (
    <tr className={styles.listItem} onClick={() => navigate(`/assets/${props.id}`)}>
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
    </tr>
  );
};

export default AssetListItem;