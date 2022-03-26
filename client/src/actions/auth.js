import jwt_decode from 'jwt-decode';

import { LOGIN, GET_ERRORS, USER_LOADING } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const logIn = (formData, router) => async (dispatch) => {
  try {
    // Send request for token to API
    const res = await api.logIn(formData);

    // Store the token in local storage
    localStorage.setItem('jwtToken', res.data.token);

    const decoded = jwt_decode(res.data.token);

    // Dispatch to LOGIN reducer
    dispatch({ type: LOGIN, user: decoded });

    // Push to home after login
    router('/');
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error });
  }
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};