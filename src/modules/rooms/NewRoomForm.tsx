import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { api } from '@utils/api'
import { Button, FormInput } from '@components/form'

type RoomFormFields = {
  name: string
}

const NewRoomForm = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid }
  } = useForm<RoomFormFields>({ mode: 'onChange' })

  const utils = api.useContext()

  const addRoom = api.room.add.useMutation({
    async onSuccess() {
      await utils.room.invalidate()
    }
  })

  const onSubmit = handleSubmit(async (data) => {
    await addRoom.mutateAsync({ data })
    router.push('/rooms')
  })

  const content = (
    <div className='m-auto max-w-lg p-4'>
      <form onSubmit={onSubmit} className='flex flex-col gap-4'>
        <FormInput<RoomFormFields>
          id='name'
          name='name'
          label='Name'
          register={register}
          rules={{ required: 'You must enter a name.' }}
          errors={errors}
        />

        <div className='flex justify-between'>
          <span></span>
          <Button type='submit' disabled={!isDirty || !isValid}>
            Save
          </Button>
        </div>
      </form>
    </div>
  )

  return content
}

export default NewRoomForm
