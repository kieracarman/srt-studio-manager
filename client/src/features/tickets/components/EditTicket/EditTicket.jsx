import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import styles from './EditTicket.module.css'
import {
  selectTicketById,
  useUpdateTicketMutation,
  useDeleteTicketMutation
} from '../../ticketsApiSlice'

const EditTicket = () => {
  const [updateTicket, { isLoading, isSuccess, isError, error }] =
    useUpdateTicketMutation()

  const [
    deleteTicket,
    { isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError }
  ] = useDeleteTicketMutation()

  const { id } = useParams()
  const navigate = useNavigate()

  const ticket = useSelector((state) => selectTicketById(state, id))

  const [title, setTitle] = useState(ticket.title)
  const [description, setDescription] = useState(ticket.description)
  const [assignedRole, setAssignedRole] = useState(ticket.assignedRole)
  const [status, setStatus] = useState(ticket.status)
  const [deleteText, setDeleteText] = useState('Delete Ticket')

  useEffect(() => {
    if (isSuccess || isDeleteSuccess) {
      setTitle('')
      setDescription('')
      setAssignedRole('')
      setStatus('')
      navigate('/tickets')
    }
  }, [isSuccess, isDeleteSuccess, navigate])

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onDescriptionChanged = (e) => setDescription(e.target.value)
  const onAssignedRoleChanged = (e) => setAssignedRole(e.target.value)
  const onStatusChanged = (e) => setStatus(e.target.value)

  const canSave =
    [title, description, assignedRole, status].every(Boolean) && !isLoading

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (canSave) {
      await updateTicket({
        id,
        title,
        description,
        assignedRole,
        status
      })
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault()

    deleteText === 'Delete Ticket'
      ? setDeleteText('Are you sure?')
      : await deleteTicket({ id })
  }

  const errClass = isError || isDeleteError ? 'errmsg' : 'offscreen'
  const errContent = (error?.data?.message || deleteError?.data?.message) ?? ''

  const disabledButtonClass = canSave ? '' : 'disabled'

  const content = (
    <div className={styles.editForm}>
      <span className={errClass}>{errContent}</span>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input onChange={onTitleChanged} value={title} id='title' />
        <label>Description</label>
        <textarea
          onChange={onDescriptionChanged}
          value={description}
          id='description'
        />
        <label>Assigned Role</label>
        <select
          onChange={onAssignedRoleChanged}
          value={assignedRole}
          id='assignedRole'
        >
          <option value='' disabled selected hidden>
            Select...
          </option>
          <option value='supervisor'>supervisor</option>
          <option value='admin'>admin</option>
        </select>
        <label>Status</label>
        <select onChange={onStatusChanged} value={status} id='status'>
          <option selected value='pending'>
            pending
          </option>
          <option value='in progress'>in progress</option>
          <option value='complete'>complete</option>
        </select>
        <div>
          <button type='button' onClick={handleDelete} className='alert'>
            {deleteText}
          </button>
          <button
            className={disabledButtonClass}
            type='submit'
            disabled={!canSave}
          >
            {canSave ? 'Save' : 'Missing Required Fields'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditTicket
