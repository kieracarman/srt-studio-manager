import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'

import styles from './NewAssetForm.module.css'
import { trpc } from '@utils/trpc'

type TFormValues = {
  description: string
  tagNumber: string
  make: string
  model: string
  serialNumber: string
  location: string
  acquisitionDate: Date
  acquisitionAmount: string
  status: string
  type: string
  minimumAccessLevel: string
}

const NewAssetForm = () => {
  const router = useRouter()

  const { register, handleSubmit } = useForm<TFormValues>()

  const utils = trpc.useContext()

  const addAsset = trpc.useMutation(['asset.add'], {
    async onSuccess() {
      await utils.invalidateQueries(['asset.getAll'])
    }
  })

  const { data: rooms } = trpc.useQuery(['room.getAll'])

  const onSubmit: SubmitHandler<TFormValues> = async (data) => {
    await addAsset.mutateAsync({
      location: data.location,
      data
    })
    router.push('/assets')
  }

  const content = (
    <div className={styles.editForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='description'>Description</label>
        <input {...register('description')} />
        <label htmlFor='tagNumber'>Tag #</label>
        <input {...register('tagNumber')} />
        <label htmlFor='make'>Make</label>
        <input {...register('make')} />
        <label htmlFor='model'>Model</label>
        <input {...register('model')} />
        <label htmlFor='serialNumber'>Serial #</label>
        <input {...register('serialNumber')} />
        <label htmlFor='location'>Location</label>
        <select {...register('location')} defaultValue=''>
          <option value='' disabled>
            Select...
          </option>
          {rooms?.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </select>
        <label htmlFor='acquisitionDate'>Acquisition Date</label>
        <input {...register('acquisitionDate')} />
        <label htmlFor='acquisitionAmount'>Acquisition Amount</label>
        <input {...register('acquisitionAmount')} />
        <label htmlFor='status'>Status</label>
        <select {...register('status')} defaultValue=''>
          <option value='' disabled>
            Select...
          </option>
          <option value='in'>in</option>
          <option value='out'>out</option>
        </select>
        <label htmlFor='type'>Asset Type</label>
        <select {...register('type')} defaultValue=''>
          <option value='' disabled>
            Select...
          </option>
          <option value='hardware'>hardware</option>
          <option value='software'>software</option>
        </select>
        <label htmlFor='minimumAccessLevel'>Minimum Access Level</label>
        <select {...register('minimumAccessLevel')} defaultValue=''>
          <option value='' disabled>
            Select...
          </option>
          <option value='sophomore'>sophomore</option>
          <option value='junior'>junior</option>
          <option value='senior'>senior</option>
          <option value='staff'>staff</option>
        </select>
        <div>
          <span></span>
          <button className='button' type='submit'>
            Save
          </button>
        </div>
      </form>
    </div>
  )

  return content
}

export default NewAssetForm
