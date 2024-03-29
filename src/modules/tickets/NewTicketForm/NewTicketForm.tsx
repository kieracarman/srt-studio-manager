import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useForm, SubmitHandler } from 'react-hook-form'

import styles from './NewTicketForm.module.css'
import { api } from '@utils/api'
import { Button } from '@components/form'

type FormValues = {
  title: string
  text: string
  assignedRole: string
  status: string
}

const NewTicketForm = () => {
  const router = useRouter()

  const { data: session } = useSession()

  const { register, handleSubmit } = useForm<FormValues>()

  const utils = api.useContext()

  const addTicket = api.ticket.add.useMutation({
    async onSuccess() {
      await utils.ticket.invalidate()
    }
  })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await addTicket.mutateAsync({ createdBy: session?.user?.id, data })
    router.push('/tickets')
  }

  const content = (
    <div className={styles.editForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Title</label>
        <input {...register('title')} id='title' />
        <label>Text</label>
        <textarea {...register('text')} id='description' />
        <label>Assigned Role</label>
        <select {...register('assignedRole')} id='assignedRole'>
          <option value='' disabled defaultValue=''>
            Select...
          </option>
          <option value='supervisor'>supervisor</option>
          <option value='admin'>admin</option>
        </select>
        <label>Status</label>
        <select {...register('status')} id='status'>
          <option selected value='pending'>
            pending
          </option>
          <option value='in progress'>in progress</option>
          <option value='complete'>complete</option>
        </select>
        <div>
          <span></span>
          <Button type='submit'>Save</Button>
        </div>
      </form>
    </div>
  )

  return content
}

export default NewTicketForm
