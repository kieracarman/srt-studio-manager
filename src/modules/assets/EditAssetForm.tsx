import { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { api } from '@utils/api'
import { Prisma } from '@prisma/client'
import { Alert } from '@components/ui'
import { Button, FormInput, FormSelect } from '@components/form'

type AssetWithLocation = Prisma.AssetGetPayload<{
  include: { location: true }
}>

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

const EditAssetForm = ({ asset }: { asset: AssetWithLocation }) => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid }
  } = useForm<AssetFormFields>({ mode: 'onChange' })

  const utils = api.useContext()

  const editAsset = api.asset.edit.useMutation({
    async onSuccess() {
      await utils.asset.invalidate()
    }
  })

  const deleteAsset = api.asset.delete.useMutation({
    async onSuccess() {
      await utils.asset.invalidate()
    }
  })

  const { data: rooms } = api.room.getAll.useQuery()

  const onSubmit = handleSubmit(async (data) => {
    await editAsset.mutateAsync({
      id: asset.id,
      location: data.location,
      data
    })
    router.push('/assets')
  })

  const [open, setOpen] = useState(false)

  const handleDelete = async () => {
    await deleteAsset.mutateAsync({ id: asset.id })
    router.push('/assets')
  }

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
          defaultValue={asset.description}
        />

        <FormInput<AssetFormFields>
          id='tagNumber'
          name='tagNumber'
          label='Tag #'
          register={register}
          rules={{ required: 'You must enter a description.' }}
          errors={errors}
          defaultValue={asset.tagNumber}
        />

        <FormInput<AssetFormFields>
          id='make'
          name='make'
          label='Make'
          register={register}
          rules={{ required: 'You must enter a make.' }}
          errors={errors}
          defaultValue={asset.make}
        />

        <FormInput<AssetFormFields>
          id='model'
          name='model'
          label='Model'
          register={register}
          rules={{ required: 'You must enter a model.' }}
          errors={errors}
          defaultValue={asset.model}
        />

        <FormInput<AssetFormFields>
          id='serialNumber'
          name='serialNumber'
          label='Serial #'
          register={register}
          rules={{ required: 'You must enter a serial number.' }}
          errors={errors}
          defaultValue={asset.serialNumber ?? ''}
        />

        <FormSelect<AssetFormFields>
          id='location'
          name='location'
          label='Location'
          register={register}
          rules={{ required: 'You must enter a location.' }}
          errors={errors}
          defaultValue={asset.location.id}
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
          defaultValue={asset.acquisitionAmount ?? ''}
        />

        <FormSelect<AssetFormFields>
          id='status'
          name='status'
          label='Status'
          register={register}
          rules={{ required: 'You must enter a status.' }}
          errors={errors}
          defaultValue={asset.status}
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
          defaultValue={asset.type}
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
          defaultValue={asset.minimumAccessLevel}
        >
          <option value='sophomore'>sophomore</option>
          <option value='junior'>junior</option>
          <option value='senior'>senior</option>
          <option value='staff'>staff</option>
        </FormSelect>

        <div className='flex justify-between'>
          <Button variant='secondary' onClick={() => setOpen(true)}>
            Delete asset
          </Button>
          <Button type='submit' disabled={!isDirty || !isValid}>
            Save
          </Button>
        </div>
      </form>
      <Alert
        open={open}
        setOpen={setOpen}
        action={handleDelete}
        title='Are you sure?'
        description='Once an asset is deleted, it cannot be recovered. Deleting an asset is permanent.'
        confirmText='Yes, delete asset'
      />
    </div>
  )

  return content
}

export default EditAssetForm
