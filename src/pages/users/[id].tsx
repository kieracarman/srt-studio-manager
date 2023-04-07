import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { Modal } from '@components/ui'
import EditUserForm from '@modules/users/EditUserForm/EditUserForm'
import { api } from '@utils/api'

const EditUser: NextPage = () => {
  const router = useRouter()

  if (!router.query.id) return <p>Loading...</p>

  const id = router.query.id.toString()

  const { data, isSuccess } = api.user.getOne.useQuery({ id })

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
