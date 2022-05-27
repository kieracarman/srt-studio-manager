import isEmpty from 'is-empty';

import {
  START_LOADING_AUTH,
  END_LOADING_AUTH,
  LOGIN,
  LOGOUT
} from '../constants/actionTypes';

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  token: {}
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING_AUTH:
      return { ...state, isLoading: true };
    case END_LOADING_AUTH:
      return { ...state, isLoading: false };
    case LOGIN:
      return { ...state, isAuthenticated: !isEmpty(action.token), token: action.token };
    case LOGOUT:
      localStorage.removeItem('jwtToken');
      return { ...state, isAuthenticated: false, token: {} };
    default:
      return state;
  }
};

export default authReducer;