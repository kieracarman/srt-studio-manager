import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'

import styles from './NewUserForm.module.css'
import { trpc } from '@utils/trpc'

type FormValues = {
  firstName: string
  lastName: string
  email: string
  role: string
  accessLevel: string
  password?: string
}

const NewUserForm = () => {
  const router = useRouter()

  const { register, handleSubmit } = useForm<FormValues>()

  const utils = trpc.useContext()

  const addUser = trpc.useMutation(['user.add'], {
    async onSuccess() {
      await utils.invalidateQueries(['user.getAll'])
    }
  })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await addUser.mutateAsync({ data })
    router.push('/users')
  }

  const content = (
    <div className={styles.editForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>First Name</label>
        <input {...register('firstName')} id='firstName' />
        <label>Last Name</label>
        <input {...register('lastName')} id='lastName' />
        <label>Role</label>
        <select {...register('role')} id='role' defaultValue=''>
          <option value='' disabled>
            Select...
          </option>
          <option value='basic'>basic</option>
          <option value='supervisor'>supervisor</option>
          <option value='admin'>admin</option>
        </select>
        <label>Access Level</label>
        <select {...register('accessLevel')} id='accessLevel'>
          <option value='' disabled defaultValue=''>
            Select...
          </option>
          <option value='sophomore'>sophomore</option>
          <option value='junior'>junior</option>
          <option value='senior'>senior</option>
          <option value='staff'>staff</option>
        </select>
        <label>Password</label>
        <input type='password' {...register('password')} id='password' />
        <div>
          <span></span>
          <button type='submit' className='button'>
            Save
          </button>
        </div>
      </form>
    </div>
  )

  return content
}

export default NewUserForm
