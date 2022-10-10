import { NextPage } from 'next'

import Modal from '@components/Modal/Modal'
import NewAssetForm from '@modules/assets/NewAssetForm/NewAssetForm'

const NewAsset: NextPage = () => {
  return (
    <Modal onClose='/assets'>
      <NewAssetForm />
    </Modal>
  )
}

export default NewAsset
