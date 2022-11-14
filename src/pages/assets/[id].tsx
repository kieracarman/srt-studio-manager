import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { trpc } from '@utils/trpc'
import { Modal, Loader } from '@components/ui'
import EditAssetForm from '@modules/assets/EditAssetForm'

const EditAsset: NextPage = () => {
  const router = useRouter()

  if (!router.query.id) return <Loader />

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
