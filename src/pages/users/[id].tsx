import { NextPage } from 'next'
import { useRouter } from 'next/router'

import Modal from '@components/Modal/Modal'
import EditUserForm from '@modules/users/EditUserForm/EditUserForm'
import { trpc } from '@utils/trpc'

const EditUser: NextPage = () => {
  const router = useRouter()

  if (!router.query.id) return <p>Loading...</p>

  const id = router.query.id.toString()

  const { data, isSuccess } = trpc.useQuery(['user.getOne', { id }])

  if (isSuccess) {
    return (
      <Modal onClose='/users'>
        <EditUserForm user={data} />
      </Modal>
    )
  }

  return <p>Loading...</p>
}

export default EditUser
