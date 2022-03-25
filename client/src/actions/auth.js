import { LOGIN, GET_ERRORS, USER_LOADING } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const logIn = (formData, router) => async (dispatch) => {
  try {
    const res = await api.logIn(formData);

    dispatch({ type: LOGIN, token: res.data.token });

    // we are not pushing to /? why?
    router.push('/');
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