import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classnames from 'classnames';

import styles from './Login.module.css';
import { logIn } from '../../actions/auth';

const initialState = {
  username: '',
  password: '',
}

const Login = () => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logIn(form, navigate));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  return (
    <div className={styles.loginBg}>
      <div className={styles.loginBox}>
        <form noValidate onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <h2>SRT Studio Manager</h2>
          </div>
          <div className={styles.formGroup}>
            <input
              autoFocus
              onChange={handleChange}
              value={form.username}
              error={errors.username}
              id='username'
              type='username'
              placeholder='Username'
              className={classnames(styles.formControl, {
                invalid: errors.username || errors.usernameNotFound
              })}
            />
            <div className={styles.formError}>
              <span>
                {errors.username}
                {errors.usernameNotFound}
              </span>
            </div>
          </div>
          <div className={styles.formGroup}>
            <input
              onChange={handleChange}
              value={form.password}
              error={errors.password}
              id='password'
              type='password'
              placeholder='Password'
              className={classnames(styles.formControl, {
                invalid: errors.password || errors.incorrectPassword
              })}
            />
            <div className={styles.formError}>
              <span>
                {errors.password}
                {errors.incorrectPassword}
              </span>
            </div>
          </div>
          <button type='submit' className={styles.loginButton}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;