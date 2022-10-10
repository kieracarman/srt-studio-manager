import { NextPage } from 'next'

import Modal from '@components/Modal/Modal'
import NewTicketForm from '@modules/tickets/NewTicketForm/NewTicketForm'

const NewTicket: NextPage = () => {
  return (
    <Modal onClose='/tickets'>
      <NewTicketForm />
    </Modal>
  )
}

export default NewTicket
