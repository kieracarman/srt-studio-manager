import { Prisma } from '@prisma/client'

import styles from './TicketList.module.css'
import TicketListItem from '../TicketListItem/TicketListItem'
import useTableData from '@hooks/useTableData'

type TicketWithRelations = Prisma.TicketGetPayload<{
  include: { createdBy: true }
}>

type TicketListProps = {
  query: string
  tickets: TicketWithRelations[]
  error?: string
}

const TicketList = ({ query, tickets, error }: TicketListProps) => {
  const { tableData, requestSort, sortArrow } =
    useTableData<TicketWithRelations>(tickets, {
      direction: '',
      key: ''
    })

  const filterArray = (array: TicketWithRelations[]) => {
    return array.filter((item) => {
      return query !== ''
        ? [item.id, item.title, item.text]
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
        key={ticket.id}
        id={ticket.id}
        title={ticket.title}
        createdBy={ticket.createdBy}
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
          <th onClick={() => requestSort('createdBy.firstName')}>
            Created By{sortArrow('createdBy.firstName')}
          </th>
          <th onClick={() => requestSort('assignedRole')}>
            Assigned Role{sortArrow('assignedRole')}
          </th>
          <th onClick={() => requestSort('status')}>
            Status{sortArrow('status')}
          </th>
        </tr>
      </thead>
      <tbody>
        {error && (
          <tr>
            <td>{error}</td>
          </tr>
        )}
        {tableContent}
      </tbody>
    </table>
  )

  return content
}

export default TicketList
