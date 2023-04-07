import { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'

import styles from './EditTicketForm.module.css'
import { api } from '@utils/api'
import { Ticket } from '@prisma/client'
import { Alert } from '@components/ui'
import { Button } from '@components/form'

type FormValues = {
  title: string
  text: string
  assignedRole: string
  status: string
}

const EditTicketForm = ({ ticket }: { ticket: Ticket }) => {
  const router = useRouter()

  const { register, handleSubmit } = useForm<FormValues>()

  const utils = api.useContext()

  const editTicket = api.ticket.edit.useMutation({
    async onSuccess() {
      await utils.ticket.invalidate()
    }
  })

  const deleteTicket = api.ticket.delete.useMutation({
    async onSuccess() {
      await utils.ticket.invalidate()
    }
  })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await editTicket.mutateAsync({
      id: ticket.id,
      data
    })
  }

  const [open, setOpen] = useState(false)

  const handleDelete = async () => {
    await deleteTicket.mutateAsync({ id: ticket.id })
    router.push('/bookings')
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
          <option value='' disabled defaultValue={ticket.assignedRole}>
            Select...
          </option>
          <option value='supervisor'>supervisor</option>
          <option value='admin'>admin</option>
        </select>
        <label>Status</label>
        <select
          {...register('status')}
          id='status'
          defaultValue={ticket.status}
        >
          <option value='pending'>pending</option>
          <option value='in progress'>in progress</option>
          <option value='complete'>complete</option>
        </select>
        <div>
          <Button variant='secondary' onClick={() => setOpen(true)}>
            Delete ticket
          </Button>
          <Button type='submit'>Save</Button>
        </div>
      </form>
      <Alert
        open={open}
        setOpen={setOpen}
        action={handleDelete}
        title='Are you sure?'
        description='Once a ticket is deleted, it cannot be recovered. Deleting a ticket is permanent.'
        confirmText='Yes, delete ticket'
      />
    </div>
  )

  return content
}

export default EditTicketForm
