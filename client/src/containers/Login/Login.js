import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Login.module.css';
import { logIn } from '../../actions/auth';

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setError('');
  }, [user, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(logIn({ username: user, password: password}, navigate));
      setUser('');
      setPassword('');
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className={styles.loginBg}>
      <section className={styles.loginBox}>
        <form onSubmit={handleSubmit}>
          <span ref={errRef} aria-live='assertive'>{error}</span>
          <h2>SRT Studio Manager</h2>
          <label htmlFor='username' aria-label='username'>Username</label>
          <input
            type='text'
            id='username'
            ref={userRef}
            autoComplete='off'
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />
          <label htmlFor='password' aria-label='password'>Password</label>
          <input
            type='password'
            id='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <button>Sign In</button>
        </form>
      </section>
    </div>
  );
};

export default Login;

// OLD LOGIN CODE
//
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import classnames from 'classnames';
//
// import { logIn } from '../actions/auth';
//
// const initialState = {
//   username: '',
//   password: '',
// }
//
// const Login = () => {
//   const [form, setForm] = useState(initialState);
//   const [errors, setErrors] = useState({});
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(logIn(form, navigate));
//   };
//
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.id]: e.target.value });
//   };
//
//   return (
//     <div className='login-bg'>
//       <div className='login-box'>
//         <form noValidate onSubmit={handleSubmit}>
//           <div className='form-group'>
//             <h2>SRT Studio Manager</h2>
//           </div>
//           <div className='form-group'>
//             <input
//               autoFocus
//               onChange={handleChange}
//               value={form.username}
//               error={errors.username}
//               id='username'
//               type='username'
//               placeholder='Username'
//               className={classnames('form-control', {
//                 invalid: errors.username || errors.usernameNotFound
//               })}
//             />
//             <div className='form-error'>
//               <span>
//                 {errors.username}
//                 {errors.usernameNotFound}
//               </span>
//             </div>
//           </div>
//           <div className='form-group'>
//             <input
//               onChange={handleChange}
//               value={form.password}
//               error={errors.password}
//               id='password'
//               type='password'
//               placeholder='Password'
//               className={classnames('form-control', {
//                 invalid: errors.password || errors.incorrectPassword
//               })}
//             />
//             <div className='form-error'>
//               <span>
//                 {errors.password}
//                 {errors.incorrectPassword}
//               </span>
//             </div>
//           </div>
//           <button type='submit' className='login-button'>Login</button>
//         </form>
//       </div>
//     </div>
//   );
// };
//
// export default Login;