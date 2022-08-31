import styles from './TicketList.module.css'
import { TicketListItem } from '../'
import { useTableData } from '../../../../hooks'

const TicketList = ({ query, tickets }) => {
  const { tableData, requestSort, sortArrow } = useTableData(tickets)

  const filterArray = (array) => {
    return array.filter((item) => {
      return query !== ''
        ? [item._id, item.title, item.description]
            .join(' ')
            .toString()
            .toLowerCase()
            .indexOf(query.toLowerCase()) > -1
        : true
    })
  }

  const tableContent = filterArray(tableData).map((ticket) => {
    return (
      <TicketListItem
        key={ticket._id}
        id={ticket._id}
        createdBy={ticket.author.username}
        title={ticket.title}
        assignedRole={ticket.assignedRole}
        status={ticket.status}
      />
    )
  })

  const content = (
    <table className={styles.list}>
      <thead>
        <tr>
          <th onClick={() => requestSort('title')}>
            Title{sortArrow('title')}
          </th>
          <th onClick={() => requestSort('createdBy')}>
            Created By{sortArrow('createdBy')}
          </th>
          <th onClick={() => requestSort('assignedRole')}>
            Assigned Role{sortArrow('assignedRole')}
          </th>
          <th onClick={() => requestSort('status')}>
            Status{sortArrow('status')}
          </th>
        </tr>
      </thead>
      <tbody>{tableContent}</tbody>
    </table>
  )

  return content
}

export default TicketList
