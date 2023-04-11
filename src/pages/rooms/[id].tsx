import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { api } from '@utils/api'
import { Modal, Loader } from '@components/ui'
import EditRoomForm from '@modules/rooms/EditRoomForm'

const EditRoom: NextPage = () => {
  const router = useRouter()

  if (!router.query.id) return <Loader />

  const id = router.query.id.toString()

  const { data, isSuccess } = api.room.getOne.useQuery({ id })

  if (isSuccess) {
    return (
      <Modal onClose='/rooms'>
        <EditRoomForm room={data} />
      </Modal>
    )
  }

  return <p>Loading...</p>
}

export default EditRoom
