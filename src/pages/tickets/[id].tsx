import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { Modal } from '@components/ui'
import EditTicketForm from '@modules/tickets/EditTicketForm/EditTicketForm'
import { api } from '@utils/api'

const EditTicket: NextPage = () => {
  const router = useRouter()

  if (!router.query.id) return <p>Loading...</p>

  const id = router.query.id.toString()

  const { data, isSuccess } = api.ticket.getOne.useQuery({ id })

  if (isSuccess) {
    return (
      <Modal onClose='/tickets'>
        <EditTicketForm ticket={data} />
      </Modal>
    )
  }

  return <p>Loading...</p>
}

export default EditTicket
