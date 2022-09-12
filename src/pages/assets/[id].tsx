import { NextPage } from 'next'
import { useRouter } from 'next/router'

import Modal from '@components/Modal/Modal'
import EditAssetForm from '@modules/assets/EditAssetForm/EditAssetForm'
import { trpc } from '@utils/trpc'

const EditAsset: NextPage = () => {
  const router = useRouter()

  if (!router.query.id) return <p>Loading...</p>

  const id = router.query.id.toString()

  const { data, isSuccess } = trpc.useQuery(['asset.getOne', { id }])

  if (isSuccess) {
    return (
      <Modal onClose='/assets'>
        <EditAssetForm asset={data} />
      </Modal>
    )
  }

  return <p>Loading...</p>
}

export default EditAsset
