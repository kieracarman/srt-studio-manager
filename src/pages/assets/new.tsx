import { NextPage } from 'next'

import { Modal } from '@components/ui'
import NewAssetForm from '@modules/assets/NewAssetForm'

const NewAsset: NextPage = () => {
  return (
    <Modal onClose='/assets'>
      <NewAssetForm />
    </Modal>
  )
}

export default NewAsset
