import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import styles from './EditUser.module.css'
import {
  getUser,
  createUser,
  updateUser,
  deleteUser
} from '../../../actions/users'

const EditUser = () => {
  const { user, isLoading } = useSelector((state) => state.users)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const [modifiedUser, setModifiedUser] = useState({ username: '' })
  const [deleteText, setDeleteText] = useState('Delete User')

  useEffect(() => {
    if (id !== 'new') {
      dispatch(getUser(id))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (id !== 'new') {
      setModifiedUser(user)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const handleChange = (e) => {
    setModifiedUser({ ...modifiedUser, [e.target.id]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (id === 'new') {
      dispatch(createUser(modifiedUser, navigate))
    }
    dispatch(updateUser(id, modifiedUser, navigate))
  }

  const handleDelete = (e) => {
    e.preventDefault()

    deleteText === 'Delete User'
      ? setDeleteText('Are you sure?')
      : dispatch(deleteUser(id, navigate))
  }

  return (
    <div className={styles.editForm}>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            onChange={handleChange}
            value={modifiedUser.username}
            id='username'
          />
          <label>First Name</label>
          <input
            onChange={handleChange}
            value={modifiedUser.firstName}
            id='firstName'
          />
          <label>Last Name</label>
          <input
            onChange={handleChange}
            value={modifiedUser.lastName}
            id='lastName'
          />
          <label>Role</label>
          <select onChange={handleChange} value={modifiedUser.role} id='role'>
            <option value='' disabled selected hidden>
              Select...
            </option>
            <option value='basic'>basic</option>
            <option value='supervisor'>supervisor</option>
            <option value='admin'>admin</option>
          </select>
          <label>Access Level</label>
          <select
            onChange={handleChange}
            value={modifiedUser.accessLevel}
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
          <label>{id !== 'new' ? 'New ' : ''}Password</label>
          <input
            type='password'
            onChange={handleChange}
            value={modifiedUser.password}
            id='password'
          />
          <div>
            {id !== 'new' ? (
              <button type='button' onClick={handleDelete} className='alert'>
                {deleteText}
              </button>
            ) : (
              <span></span>
            )}
            <button type='submit'>Save</button>
          </div>
        </form>
      )}
    </div>
  )
}

export default EditUser
