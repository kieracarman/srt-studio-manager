import { MouseEvent, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'

import styles from './EditAssetForm.module.css'
import { trpc } from '@utils/trpc'
import { Prisma } from '@prisma/client'

type TAssetWithLocation = Prisma.AssetGetPayload<{
  include: { location: true }
}>

type TFormValues = {
  description: string
  tagNumber: string
  make: string
  model: string
  serialNumber: string
  location: string
  acquisitionAmount: string
  status: string
  type: string
  minimumAccessLevel: string
}

const EditAssetForm = ({ asset }: { asset: TAssetWithLocation }) => {
  const router = useRouter()

  const { register, handleSubmit } = useForm<TFormValues>()

  const utils = trpc.useContext()

  const editAsset = trpc.useMutation('asset.edit', {
    async onSuccess() {
      await utils.invalidateQueries(['asset.getAll'])
      await utils.invalidateQueries(['asset.getOne', { id: asset.id }])
    }
  })

  const deleteAsset = trpc.useMutation(['asset.delete'], {
    async onSuccess() {
      await utils.invalidateQueries(['asset.getAll'])
    }
  })

  const { data: rooms } = trpc.useQuery(['room.getAll'])

  const onSubmit: SubmitHandler<TFormValues> = async (data) => {
    await editAsset.mutateAsync({
      id: asset.id,
      location: data.location,
      data
    })
    router.push('/assets')
  }

  const [deleteText, setDeleteText] = useState('Delete Asset')

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (deleteText === 'Delete Asset') {
      setDeleteText('Are you sure?')
    } else {
      await deleteAsset.mutateAsync({ id: asset.id })
      router.push('/assets')
    }
  }

  const content = (
    <div className={styles.editForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='description'>Description</label>
        <input {...register('description')} defaultValue={asset.description} />
        <label htmlFor='tagNumber'>Tag #</label>
        <input {...register('tagNumber')} defaultValue={asset.tagNumber} />
        <label htmlFor='make'>Make</label>
        <input {...register('make')} defaultValue={asset.make} />
        <label htmlFor='model'>Model</label>
        <input {...register('model')} defaultValue={asset.model} />
        <label htmlFor='serialNumber'>Serial #</label>
        <input
          {...register('serialNumber')}
          defaultValue={asset.serialNumber ?? ''}
        />
        <label htmlFor='location'>Location</label>
        <select {...register('location')} defaultValue={asset.location.id}>
          <option value='' disabled>
            Select...
          </option>
          {rooms?.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </select>
        <label htmlFor='acquisitionAmount'>Acquisition Amount</label>
        <input
          {...register('acquisitionAmount')}
          defaultValue={asset.acquisitionAmount ?? ''}
        />
        <label htmlFor='status'>Status</label>
        <select {...register('status')} defaultValue={asset.status}>
          <option value='' disabled>
            Select...
          </option>
          <option value='in'>in</option>
          <option value='out'>out</option>
        </select>
        <label htmlFor='type'>Asset Type</label>
        <select {...register('type')} defaultValue={asset.type}>
          <option value='' disabled>
            Select...
          </option>
          <option value='hardware'>hardware</option>
          <option value='software'>software</option>
        </select>
        <label htmlFor='minimumAccessLevel'>Minimum Access Level</label>
        <select
          {...register('minimumAccessLevel')}
          defaultValue={asset.minimumAccessLevel}
        >
          <option value='' disabled>
            Select...
          </option>
          <option value='sophomore'>sophomore</option>
          <option value='junior'>junior</option>
          <option value='senior'>senior</option>
          <option value='staff'>staff</option>
        </select>
        <div>
          <button type='button' onClick={handleDelete} className='button alert'>
            {deleteText}
          </button>
          <button className='button' type='submit'>
            Save
          </button>
        </div>
      </form>
    </div>
  )

  return content
}

export default EditAssetForm
