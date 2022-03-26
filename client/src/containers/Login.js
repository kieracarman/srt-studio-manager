import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classnames from 'classnames';

import { logIn } from '../actions/auth';

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
    <div className='login-bg'>
      <div className='login-box'>
        <form noValidate onSubmit={handleSubmit}>
          <div className='form-group'>
            <h2>SRT Studio Manager</h2>
          </div>
          <div className='form-group'>
            <input
              autoFocus
              onChange={handleChange}
              value={form.username}
              error={errors.username}
              id='username'
              type='username'
              placeholder='Username'
              className={classnames('form-control', {
                invalid: errors.username || errors.usernameNotFound
              })}
            />
            <div className='form-error'>
              <span>
                {errors.username}
                {errors.usernameNotFound}
              </span>
            </div>
          </div>
          <div className='form-group'>
            <input
              onChange={handleChange}
              value={form.password}
              error={errors.password}
              id='password'
              type='password'
              placeholder='Password'
              className={classnames('form-control', {
                invalid: errors.password || errors.incorrectPassword
              })}
            />
            <div className='form-error'>
              <span>
                {errors.password}
                {errors.incorrectPassword}
              </span>
            </div>
          </div>
          <button type='submit' className='login-button'>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;