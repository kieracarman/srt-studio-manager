import { MouseEvent, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'

import styles from './EditUserForm.module.css'
import { trpc } from '@utils/trpc'
import { User } from '@prisma/client'

type FormValues = User & {
  password?: string
}

const EditUserForm = ({ user }: { user: User }) => {
  const router = useRouter()

  const { register, handleSubmit } = useForm<FormValues>()

  const utils = trpc.useContext()

  const editUser = trpc.useMutation('user.edit', {
    async onSuccess() {
      await utils.invalidateQueries(['user.getAll'])
      await utils.invalidateQueries(['user.getOne', { id: user.id }])
    }
  })

  const deleteUser = trpc.useMutation(['user.delete'], {
    async onSuccess() {
      await utils.invalidateQueries(['user.getAll'])
    }
  })

  const onSubmit: SubmitHandler<User> = async (data) => {
    await editUser.mutateAsync({
      id: user.id,
      data
    })
  }

  const [deleteText, setDeleteText] = useState('Delete User')

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (deleteText === 'Delete User') {
      setDeleteText('Are you sure?')
    } else {
      await deleteUser.mutateAsync({ id: user.id })
      router.push('/users')
    }
  }

  const content = (
    <div className={styles.editForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>First Name</label>
        <input {...register('firstName')} id='firstName' />
        <label>Last Name</label>
        <input {...register('lastName')} id='lastName' />
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

export default EditUserForm
