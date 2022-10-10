import { MouseEvent, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'

import styles from './EditTicketForm.module.css'
import { trpc } from '@utils/trpc'
import { Ticket } from '@prisma/client'

type FormValues = {
  title: string
  text: string
  assignedRole: string
  status: string
}

const EditTicketForm = ({ ticket }: { ticket: Ticket }) => {
  const router = useRouter()

  const { register, handleSubmit } = useForm<FormValues>()

  const utils = trpc.useContext()

  const editTicket = trpc.useMutation('ticket.edit', {
    async onSuccess() {
      await utils.invalidateQueries(['ticket.getAll'])
      await utils.invalidateQueries(['ticket.getOne', { id: ticket.id }])
    }
  })

  const deleteTicket = trpc.useMutation(['ticket.delete'], {
    async onSuccess() {
      await utils.invalidateQueries(['ticket.getAll'])
    }
  })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await editTicket.mutateAsync({
      id: ticket.id,
      data
    })
  }

  const [deleteText, setDeleteText] = useState('Delete Ticket')

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (deleteText === 'Delete Ticket') {
      setDeleteText('Are you sure?')
    } else {
      await deleteTicket.mutateAsync({ id: ticket.id })
      router.push('/bookings')
    }
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
          <button type='button' onClick={handleDelete} className='button alert'>
            {deleteText}
          </button>
          <button type='submit'>Save</button>
        </div>
      </form>
    </div>
  )

  return content
}

export default EditTicketForm
