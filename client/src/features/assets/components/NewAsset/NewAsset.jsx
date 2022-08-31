import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './NewAsset.module.css'
import { useAddNewAssetMutation } from '../../assetsApiSlice'

const NewAsset = () => {
  const [addNewAsset, { isLoading, isSuccess, isError, error }] =
    useAddNewAssetMutation()

  const navigate = useNavigate()

  const [description, setDescription] = useState('')
  const [tagNumber, setTagNumber] = useState('')
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [serialNumber, setSerialNumber] = useState('')
  const [location, setLocation] = useState('')
  const [acquisitionDate, setAcquisitionDate] = useState('')
  const [transactionAmount, setTransactionAmount] = useState('')
  const [status, setStatus] = useState('')
  const [assetType, setAssetType] = useState('')
  const [maintenanceStatus, setMaintenanceStatus] = useState('')
  const [minimumAccessLevel, setMinimumAccessLevel] = useState('')

  useEffect(() => {
    if (isSuccess) {
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
  }, [isSuccess, navigate])

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
      await addNewAsset({
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
  const errClass = isError ? 'errmsg' : 'offscreen'
  const errContent = error?.data?.message ?? ''

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
          <span></span>
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

export default NewAsset
