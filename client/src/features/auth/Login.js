import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import PulseLoader from 'react-spinners/PulseLoader'

import styles from './Login.module.css'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'

const Login = () => {
  const userRef = useRef()
  const errRef = useRef()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  useEffect(() => {
    userRef.current.focus()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { accessToken } = await login({ username, password }).unwrap()
      dispatch(setCredentials({ accessToken }))
      setUsername('')
      setPassword('')
      navigate('/')
    } catch (err) {
      if (!err.status) {
        setErrMsg('No server response.')
      } else if (err.status === 400) {
        setErrMsg('Missing username or password.')
      } else if (err.status === 401) {
        setErrMsg('Incorrect username or password.')
      } else {
        setErrMsg(err.data?.message)
      }
      errRef.current.focus()
    }
  }

  const handleUserInput = (e) => setUsername(e.target.value)
  const handlePwdInput = (e) => setPassword(e.target.value)

  const errClass = errMsg ? 'error' : 'offscreen'

  const signInButton = isLoading ? (
    <button disabled>
      <PulseLoader color='#ffffff' size={5} />
    </button>
  ) : (
    <button>Sign In</button>
  )

  const content = (
    <div className={styles.loginBg}>
      <section className={styles.loginBox}>
        <form onSubmit={handleSubmit}>
          <h2>SRT Studio Manager</h2>

          <span
            ref={errRef}
            className={`${styles.error} ${errClass}`}
            aria-live='assertive'
          >
            {errMsg}
          </span>

          <label htmlFor='username' aria-label='username'>
            Username
          </label>
          <input
            type='text'
            id='username'
            ref={userRef}
            value={username}
            onChange={handleUserInput}
            autoComplete='off'
            required
          />

          <label htmlFor='password' aria-label='password'>
            Password
          </label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={handlePwdInput}
            required
          />

          {signInButton}
        </form>
      </section>
    </div>
  )

  return content
}

export default Login
