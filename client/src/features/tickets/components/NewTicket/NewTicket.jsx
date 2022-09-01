import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './NewTicket.module.css'
import { useAddNewTicketMutation } from '../../ticketsApiSlice'

const NewTicket = () => {
  const [addNewTicket, { isLoading, isSuccess, isError, error }] =
    useAddNewTicketMutation()

  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [assignedRole, setAssignedRole] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (isSuccess) {
      setTitle('')
      setDescription('')
      setAssignedRole('')
      setStatus('')
      navigate('/tickets')
    }
  }, [isSuccess, navigate])

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onDescriptionChanged = (e) => setDescription(e.target.value)
  const onAssignedRoleChanged = (e) => setAssignedRole(e.target.value)
  const onStatusChanged = (e) => setStatus(e.target.value)

  const canSave =
    [title, description, assignedRole, status].every(Boolean) && !isLoading

  const handleSubmit = async (e) => {
    if (canSave) {
      await addNewTicket({
        title,
        description,
        assignedRole,
        status
      })
    }
  }

  const errClass = isError ? 'errmsg' : 'offscreen'
  const errContent = error?.data?.message ?? ''

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
          <span></span>
          <button
            className={disabledButtonClass}
            type='submit'
            disabled={!canSave}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )

  return content
}

export default NewTicket
