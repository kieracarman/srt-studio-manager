import { useNavigate } from 'react-router-dom';

import styles from './TicketListItem.module.css';

const TicketListItem = (props) => {
  const navigate = useNavigate();

  return (
    <tr className={styles.listItem} onClick={() => navigate(`/tickets/${props.id}`)}>
      <td className='bold'>{props.title}</td>
      <td>{props.createdBy}</td>
      <td>{props.assignedRole}</td>
      <td><span className={`${styles.statusTag} ${
        (props.status === 'pending') ? styles.pending
        : (props.status === 'in progress') ? styles.inProgress
        : (props.status === 'complete') ? styles.complete
        : ''
      }`}>{props.status}</span></td>
    </tr>
  );
};

export default TicketListItem;