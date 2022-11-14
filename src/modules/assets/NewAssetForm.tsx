import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { trpc } from '@utils/trpc'
import { Button, FormInput, FormSelect } from '@components/form'

type AssetFormFields = {
  description: string
  tagNumber: string
  make: string
  model: string
  serialNumber: string
  location: string
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

        <FormSelect<AssetFormFields>
          id='location'
          name='location'
          label='Location'
          register={register}
          rules={{ required: 'You must enter a location.' }}
          errors={errors}
        >
          {rooms?.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </FormSelect>

        <FormInput<AssetFormFields>
          id='acquisitionAmount'
          name='acquisitionAmount'
          label='Acquisition Amount'
          register={register}
          errors={errors}
        />

        <FormSelect<AssetFormFields>
          id='status'
          name='status'
          label='Status'
          register={register}
          rules={{ required: 'You must enter a status.' }}
          errors={errors}
        >
          <option value='in'>in</option>
          <option value='out'>out</option>
        </FormSelect>

        <FormSelect<AssetFormFields>
          id='type'
          name='type'
          label='Asset Type'
          register={register}
          rules={{ required: 'You must enter an asset type.' }}
          errors={errors}
        >
          <option value='hardware'>hardware</option>
          <option value='software'>software</option>
        </FormSelect>

        <FormSelect<AssetFormFields>
          id='minimumAccessLevel'
          name='minimumAccessLevel'
          label='Minimum Access Level'
          register={register}
          rules={{ required: 'You must enter a minimum access level.' }}
          errors={errors}
        >
          <option value='sophomore'>sophomore</option>
          <option value='junior'>junior</option>
          <option value='senior'>senior</option>
          <option value='staff'>staff</option>
        </FormSelect>

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
