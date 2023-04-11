import { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { api } from '@utils/api'
import { Room } from '@prisma/client'
import { Alert } from '@components/ui'
import { Button, FormInput } from '@components/form'

type RoomFormFields = {
  name: string
}

const EditRoomForm = ({ room }: { room: Room }) => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid }
  } = useForm<RoomFormFields>({ mode: 'onChange' })

  const utils = api.useContext()

  const editRoom = api.room.edit.useMutation({
    async onSuccess() {
      await utils.room.invalidate()
    }
  })

  const deleteRoom = api.room.delete.useMutation({
    async onSuccess() {
      await utils.room.invalidate()
    }
  })

  const onSubmit = handleSubmit(async (data) => {
    await editRoom.mutateAsync({ id: room.id, data })
    router.push('/rooms')
  })

  const [open, setOpen] = useState(false)

  const handleDelete = async () => {
    await deleteRoom.mutateAsync({ id: room.id })
    router.push('/rooms')
  }

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
          defaultValue={room.name}
        />

        <div className='flex justify-between'>
          <Button variant='secondary' onClick={() => setOpen(true)}>
            Delete room
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
        description='Once a room is deleted, it cannot be recovered. Deleting a room is permanent.'
        confirmText='Yes, delete room'
      />
    </div>
  )

  return content
}

export default EditRoomForm
