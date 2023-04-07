import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'

import styles from './NewUserForm.module.css'
import { api } from '@utils/api'
import { Button } from '@components/form'

type FormValues = {
  name: string
  email: string
  role: string
  accessLevel: string
  password?: string
}

const NewUserForm = () => {
  const router = useRouter()

  const { register, handleSubmit } = useForm<FormValues>()

  const utils = api.useContext()

  const addUser = api.user.add.useMutation({
    async onSuccess() {
      await utils.user.invalidate()
    }
  })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await addUser.mutateAsync({ data })
    router.push('/users')
  }

  const content = (
    <div className={styles.editForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input {...register('name')} id='firstName' />
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
          <Button type='submit'>Save</Button>
        </div>
      </form>
    </div>
  )

  return content
}

export default NewUserForm
