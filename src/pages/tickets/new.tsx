import { NextPage } from 'next'

import { Modal } from '@components/ui'
import NewTicketForm from '@modules/tickets/NewTicketForm/NewTicketForm'

const NewTicket: NextPage = () => {
  return (
    <Modal onClose='/tickets'>
      <NewTicketForm />
    </Modal>
  )
}

export default NewTicket
