import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { trpc } from '@utils/trpc'
import { Button, FormInput } from '@components/form'

type AssetFormFields = {
  description: string
  tagNumber: string
  make: string
  model: string
  serialNumber: string
  location: string
  acquisitionDate?: Date
  acquisitionAmount?: string
  status: string
  type: string
  minimumAccessLevel: string
}

const NewAssetForm = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AssetFormFields>()

  const utils = trpc.useContext()

  const addAsset = trpc.useMutation(['asset.add'], {
    async onSuccess() {
      await utils.invalidateQueries(['asset.getAll'])
    }
  })

  const { data: rooms } = trpc.useQuery(['room.getAll'])

  const onSubmit = handleSubmit(async (data) => {
    await addAsset.mutateAsync({
      location: data.location,
      data
    })
    router.push('/assets')
  })

  const content = (
    <div className='m-auto max-w-lg p-4'>
      <form onSubmit={onSubmit} className='flex flex-col gap-4'>
        <FormInput<AssetFormFields>
          id='description'
          name='description'
          label='Description'
          register={register}
          rules={{ required: 'You must enter a description.' }}
          errors={errors}
        />

        <FormInput<AssetFormFields>
          id='tagNumber'
          name='tagNumber'
          label='Tag #'
          register={register}
          rules={{ required: 'You must enter a tag number.' }}
          errors={errors}
        />

        <FormInput<AssetFormFields>
          id='make'
          name='make'
          label='Make'
          register={register}
          rules={{ required: 'You must enter a make.' }}
          errors={errors}
        />

        <FormInput<AssetFormFields>
          id='model'
          name='model'
          label='Model'
          register={register}
          rules={{ required: 'You must enter a make.' }}
          errors={errors}
        />

        <FormInput<AssetFormFields>
          id='serialNumber'
          name='serialNumber'
          label='Serial #'
          register={register}
          rules={{ required: 'You must enter a serial number.' }}
          errors={errors}
        />

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

        <FormInput<AssetFormFields>
          id='acquisitionDate'
          name='acquisitionDate'
          label='Acquisition Date'
          register={register}
          errors={errors}
        />

        <FormInput<AssetFormFields>
          id='acquisitionAmount'
          name='acquisitionAmount'
          label='Acquisition Amount'
          register={register}
          errors={errors}
        />

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

        <div className='flex justify-between'>
          <span></span>
          <Button type='submit'>Save</Button>
        </div>
      </form>
    </div>
  )

  return content
}

export default NewAssetForm
