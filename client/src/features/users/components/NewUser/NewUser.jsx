import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './NewUser.module.css'
import { useAddNewUserMutation } from '../../usersApiSlice'

const NewUser = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation()

  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [role, setRole] = useState('')
  const [accessLevel, setAccessLevel] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (isSuccess) {
      setUsername('')
      setFirstName('')
      setLastName('')
      setRole('')
      setAccessLevel('')
      setPassword('')
      navigate('/users')
    }
  }, [isSuccess, navigate])

  const onUsernameChanged = (e) => setUsername(e.target.value)
  const onFirstNameChanged = (e) => setFirstName(e.target.value)
  const onLastNameChanged = (e) => setLastName(e.target.value)
  const onAccessLevelChanged = (e) => setAccessLevel(e.target.value)
  const onRoleChanged = (e) => setRole(e.target.value)
  const onPasswordChanged = (e) => setPassword(e.target.value)

  const canSave =
    [username, firstName, lastName, role, accessLevel, password].every(
      Boolean
    ) && !isLoading

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (canSave) {
      await addNewUser({
        username,
        firstName,
        lastName,
        role,
        accessLevel,
        password
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
        <label>Password</label>
        <input
          type='password'
          onChange={onPasswordChanged}
          value={password}
          id='password'
        />
        <div>
          <span></span>
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

export default NewUser
