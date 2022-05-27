import jwt_decode from 'jwt-decode';

import {
  START_LOADING_AUTH,
  END_LOADING_AUTH,
  LOGIN,
  LOGOUT,
  GET_ERRORS
} from '../constants/actionTypes';
import * as api from '../api/index.js';

export const logIn = (formData, router) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_AUTH });

    // Send request for token to API
    const res = await api.logIn(formData);

    // Store the token in local storage
    localStorage.setItem('jwtToken', res.data.token);

    const decoded = jwt_decode(res.data.token);

    // Dispatch to LOGIN reducer
    dispatch({ type: LOGIN, token: decoded });

    // Push to home after login
    router('/');

    dispatch({ type: END_LOADING_AUTH });
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error });
  }
};

export const logOut = (router) => async (dispatch) => {
  dispatch({ type: LOGOUT });

  router('/login');
}