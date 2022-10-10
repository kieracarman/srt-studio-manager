import { NextPage } from 'next'

import Modal from '@components/Modal/Modal'
import NewUserForm from '@modules/users/NewUserForm/NewUserForm'

const NewUser: NextPage = () => {
  return (
    <Modal onClose='/users'>
      <NewUserForm />
    </Modal>
  )
}

export default NewUser
