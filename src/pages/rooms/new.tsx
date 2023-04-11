import { NextPage } from 'next'

import { Modal } from '@components/ui'
import NewRoomForm from '@modules/rooms/NewRoomForm'

const NewRoom: NextPage = () => {
  return (
    <Modal onClose='/rooms'>
      <NewRoomForm />
    </Modal>
  )
}

export default NewRoom
