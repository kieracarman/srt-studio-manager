import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import styles from './EditUser.module.css'
import {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation
} from '../../usersApiSlice'

const EditUser = () => {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation()

  const [
    deleteUser,
    { isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError }
  ] = useDeleteUserMutation()

  const { id } = useParams()
  const navigate = useNavigate()

  const { user } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id]
    })
  })

  const [username, setUsername] = useState(user.username)
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [role, setRole] = useState(user.role)
  const [accessLevel, setAccessLevel] = useState(user.accessLevel)
  const [password, setPassword] = useState('')
  const [deleteText, setDeleteText] = useState('Delete User')

  useEffect(() => {
    if (isSuccess || isDeleteSuccess) {
      setUsername('')
      setFirstName('')
      setLastName('')
      setRole('')
      setAccessLevel('')
      setPassword('')
      navigate('/users')
    }
  }, [isSuccess, isDeleteSuccess, navigate])

  const onUsernameChanged = (e) => setUsername(e.target.value)
  const onFirstNameChanged = (e) => setFirstName(e.target.value)
  const onLastNameChanged = (e) => setLastName(e.target.value)
  const onAccessLevelChanged = (e) => setAccessLevel(e.target.value)
  const onRoleChanged = (e) => setRole(e.target.value)
  const onPasswordChanged = (e) => setPassword(e.target.value)

  const canSave =
    [username, firstName, lastName, role, accessLevel].every(Boolean) &&
    !isLoading

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (canSave) {
      if (password) {
        await updateUser({
          id,
          username,
          firstName,
          lastName,
          role,
          accessLevel,
          password
        })
      } else {
        await updateUser({
          id,
          username,
          firstName,
          lastName,
          role,
          accessLevel
        })
      }
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault()

    deleteText === 'Delete User'
      ? setDeleteText('Are you sure?')
      : await deleteUser({ id })
  }

  const errClass = isError || isDeleteError ? 'errmsg' : 'offscreen'
  const errContent = (error?.data?.message || deleteError?.data?.message) ?? ''

  const disabledButtonClass = canSave ? '' : 'disabled'

  const content = (
    <div className={styles.editForm}>
      <span className={errClass}>{errContent}</span>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input onChange={onUsernameChanged} value={username} id='username' />
        <label>First Name</label>
        <input onChange={onFirstNameChanged} value={firstName} id='firstName' />
        <label>Last Name</label>
        <input onChange={onLastNameChanged} value={lastName} id='lastName' />
        <label>Role</label>
        <select onChange={onRoleChanged} value={role} id='role'>
          <option value='' disabled selected hidden>
            Select...
          </option>
          <option value='basic'>basic</option>
          <option value='supervisor'>supervisor</option>
          <option value='admin'>admin</option>
        </select>
        <label>Access Level</label>
        <select
          onChange={onAccessLevelChanged}
          value={accessLevel}
          id='accessLevel'
        >
          <option value='' disabled selected hidden>
            Select...
          </option>
          <option value='sophomore'>sophomore</option>
          <option value='junior'>junior</option>
          <option value='senior'>senior</option>
          <option value='staff'>staff</option>
        </select>
        <label>New Password</label>
        <input
          type='password'
          onChange={onPasswordChanged}
          value={password}
          id='password'
        />
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

  return content
}

export default EditUser
