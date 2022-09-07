import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import styles from './EditAsset.module.css'
import {
  useGetAssetsQuery,
  useUpdateAssetMutation,
  useDeleteAssetMutation
} from '../../assetsApiSlice'

const EditAsset = () => {
  const [updateAsset, { isLoading, isSuccess, isError, error }] =
    useUpdateAssetMutation()

  const [
    deleteAsset,
    { isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError }
  ] = useDeleteAssetMutation()

  const { id } = useParams()
  const navigate = useNavigate()

  const { asset } = useGetAssetsQuery('assetsList', {
    selectFromResult: ({ data }) => ({
      asset: data?.entities[id]
    })
  })

  const [description, setDescription] = useState(asset.description)
  const [tagNumber, setTagNumber] = useState(asset.tagNumber)
  const [make, setMake] = useState(asset.make)
  const [model, setModel] = useState(asset.model)
  const [serialNumber, setSerialNumber] = useState(asset.serialNumber)
  const [location, setLocation] = useState(asset.location)
  const [acquisitionDate, setAcquisitionDate] = useState(asset.acquisitionDate)
  const [transactionAmount, setTransactionAmount] = useState(
    asset.transactionAmount
  )
  const [status, setStatus] = useState(asset.status)
  const [assetType, setAssetType] = useState(asset.assetType)
  const [maintenanceStatus, setMaintenanceStatus] = useState(
    asset.maintenanceStatus
  )
  const [minimumAccessLevel, setMinimumAccessLevel] = useState(
    asset.minimumAccessLevel
  )
  const [deleteText, setDeleteText] = useState('Delete Asset')

  useEffect(() => {
    if (isSuccess || isDeleteSuccess) {
      setDescription('')
      setTagNumber('')
      setMake('')
      setModel('')
      setSerialNumber('')
      setLocation('')
      setAcquisitionDate('')
      setTransactionAmount('')
      setStatus('')
      setAssetType('')
      setMaintenanceStatus('')
      setMinimumAccessLevel('')
      navigate('/assets')
    }
  }, [isSuccess, isDeleteSuccess, navigate])

  const onDescriptionChanged = (e) => setDescription(e.target.value)
  const onTagNumberChanged = (e) => setTagNumber(e.target.value)
  const onMakeChanged = (e) => setMake(e.target.value)
  const onModelChanged = (e) => setModel(e.target.value)
  const onSerialNumberChanged = (e) => setSerialNumber(e.target.value)
  const onLocationChanged = (e) => setLocation(e.target.value)
  const onAcquisitionDateChanged = (e) => setAcquisitionDate(e.target.value)
  const onTransactionAmountChanged = (e) => setTransactionAmount(e.target.value)
  const onStatusChanged = (e) => setStatus(e.target.value)
  const onAssetTypeChanged = (e) => setAssetType(e.target.value)
  const onMaintenanceStatusChanged = (e) => setMaintenanceStatus(e.target.value)
  const onMinimumAccessLevelChanged = (e) =>
    setMinimumAccessLevel(e.target.value)

  const canSave =
    [
      description,
      tagNumber,
      make,
      model,
      location,
      status,
      assetType,
      maintenanceStatus,
      minimumAccessLevel
    ].every(Boolean) && !isLoading

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (canSave) {
      await updateAsset({
        id,
        description,
        tagNumber,
        make,
        model,
        serialNumber,
        location,
        acquisitionDate,
        transactionAmount,
        status,
        assetType,
        maintenanceStatus,
        minimumAccessLevel
      })
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault()

    deleteText === 'Delete Asset'
      ? setDeleteText('Are you sure?')
      : await deleteAsset({ id })
  }

  const errClass = isError || isDeleteError ? 'errmsg' : 'offscreen'
  const errContent = (error?.data?.message || deleteError?.data?.message) ?? ''

  const disabledButtonClass = canSave ? '' : 'disabled'

  const content = (
    <div className={styles.editForm}>
      <span className={errClass}>{errContent}</span>
      <form onSubmit={handleSubmit}>
        <label>Description</label>
        <input
          onChange={onDescriptionChanged}
          value={description}
          id='description'
        />
        <label>Tag #</label>
        <input onChange={onTagNumberChanged} value={tagNumber} id='tagNumber' />
        <label>Make</label>
        <input onChange={onMakeChanged} value={make} id='make' />
        <label>Model</label>
        <input onChange={onModelChanged} value={model} id='model' />
        <label>Serial #</label>
        <input
          onChange={onSerialNumberChanged}
          value={serialNumber}
          id='serialNumber'
        />
        <label>Location</label>
        <input onChange={onLocationChanged} value={location} id='location' />
        <label>Acquisition Date</label>
        <input
          onChange={onAcquisitionDateChanged}
          value={acquisitionDate}
          id='acquisitionDate'
        />
        <label>Acquisition Amount</label>
        <input
          onChange={onTransactionAmountChanged}
          value={transactionAmount}
          id='transactionAmount'
        />
        <label>Status</label>
        <select onChange={onStatusChanged} value={status} id='status'>
          <option value='' disabled selected hidden>
            Select...
          </option>
          <option value='in'>in</option>
          <option value='out'>out</option>
        </select>
        <label>Asset Type</label>
        <select onChange={onAssetTypeChanged} value={assetType} id='assetType'>
          <option value='' disabled selected hidden>
            Select...
          </option>
          <option value='hardware'>hardware</option>
          <option value='software'>software</option>
        </select>
        <label>Maintenance Status</label>
        <select
          onChange={onMaintenanceStatusChanged}
          value={maintenanceStatus}
          id='maintenanceStatus'
        >
          <option value='' disabled selected hidden>
            Select...
          </option>
          <option value='active'>active</option>
          <option value='inactive'>inactive</option>
        </select>
        <label>Minimum Access Level</label>
        <select
          onChange={onMinimumAccessLevelChanged}
          value={minimumAccessLevel}
          id='minimumAccessLevel'
        >
          <option value='' disabled selected hidden>
            Select...
          </option>
          <option value='sophomore'>sophomore</option>
          <option value='junior'>junior</option>
          <option value='senior'>senior</option>
          <option value='staff'>staff</option>
        </select>
        <div>
          <button type='button' onClick={handleDelete} className='alert'>
            {deleteText}
          </button>
          <button
            className={disabledButtonClass}
            type='submit'
            disabled={!canSave}
          >
            {canSave ? 'Save' : 'Missing Required Fields'}
          </button>
        </div>
      </form>
    </div>
  )

  return content
}

export default EditAsset
