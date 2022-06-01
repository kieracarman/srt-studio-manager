import { useSelector } from 'react-redux';

import styles from './TicketList.module.css';
import { TicketListItem } from '../';
import { useTableData } from '../../../hooks';

const TicketList = (props) => {
  const { tickets, isLoading } = useSelector((state) => state.tickets);
  const { tableData, requestSort, sortArrow } = useTableData(tickets);

  const filterArray = array => {
    return array.filter(item => {
      return props.query !== '' ? (
        [
          item._id,
          item.title,
          item.description
        ].join(' ')
          .toString()
          .toLowerCase()
          .indexOf(props.query.toLowerCase()) > -1
      ) : true;
    });
  };

  const listTickets = () => {
    return filterArray(tableData).map((ticket) => {
      return (
        <TicketListItem
          key={ticket._id}
          id={ticket._id}
          title={ticket.title}
          assignedRole={ticket.assignedRole}
          status={ticket.status}
        />
      );
    });
  };

  return (
    <table className={styles.list}>
      <thead>
        <tr>
          <th onClick={() => requestSort('title')}>Title{sortArrow('title')}</th>
          <th onClick={() => requestSort('assignedRole')}>Assigned Role{sortArrow('assignedRole')}</th>
          <th onClick={() => requestSort('status')}>Status{sortArrow('status')}</th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? <tr><td>Loading...</td></tr> : listTickets()}
      </tbody>
    </table>
  );
};

export default TicketList;