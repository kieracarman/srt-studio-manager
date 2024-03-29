import { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'

import styles from './EditUserForm.module.css'
import { api } from '@utils/api'
import { User } from '@prisma/client'
import { Alert } from '@components/ui'
import { Button } from '@components/form'

type FormValues = User & {
  password?: string
}

const EditUserForm = ({ user }: { user: User }) => {
  const router = useRouter()

  const { register, handleSubmit } = useForm<FormValues>()

  const utils = api.useContext()

  const editUser = api.user.edit.useMutation({
    async onSuccess() {
      await utils.user.invalidate()
    }
  })

  const deleteUser = api.user.delete.useMutation({
    async onSuccess() {
      await utils.user.invalidate()
    }
  })

  const onSubmit: SubmitHandler<User> = async (data) => {
    await editUser.mutateAsync({
      id: user.id,
      data
    })
    router.push('/users')
  }

  const [open, setOpen] = useState(false)

  const handleDelete = async () => {
    await deleteUser.mutateAsync({ id: user.id })
    router.push('/users')
  }

  const content = (
    <div className={styles.editForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input
          {...register('name')}
          id='name'
          defaultValue={user.name ? user.name : ''}
          disabled
        />
        <label>Role</label>
        <select {...register('role')} id='role' defaultValue={user.role}>
          <option value='' disabled>
            Select...
          </option>
          <option value='basic'>basic</option>
          <option value='supervisor'>supervisor</option>
          <option value='admin'>admin</option>
        </select>
        <label>Access Level</label>
        <select
          {...register('accessLevel')}
          id='accessLevel'
          defaultValue={user.accessLevel}
        >
          <option value='' disabled>
            Select...
          </option>
          <option value='sophomore'>sophomore</option>
          <option value='junior'>junior</option>
          <option value='senior'>senior</option>
          <option value='staff'>staff</option>
        </select>
        <label>New Password</label>
        <input type='password' {...register('password')} id='password' />
        <div>
          <Button variant='secondary' onClick={() => setOpen(true)}>
            Delete user
          </Button>
          <Button type='submit'>Save</Button>
        </div>
      </form>
      <Alert
        open={open}
        setOpen={setOpen}
        action={handleDelete}
        title='Are you sure?'
        description='Once you delete a user, it cannot be recovered. Deleting a user is permanent.'
        confirmText='Yes, delete user'
      />
    </div>
  )

  return content
}

export default EditUserForm
