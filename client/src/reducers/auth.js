import isEmpty from 'is-empty';

import * as actionType from '../constants/actionTypes';

const initialState = {
  isAuthenticated: false,
  user: {},
  users: [],
  isLoading: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.START_LOADING:
      return { ...state, isLoading: true };
    case actionType.END_LOADING:
      return { ...state, isLoading: false };
    case actionType.FETCH_ALL:
      return { ...state, users: action.payload };
    case actionType.LOGIN:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user),
        user: action.user,
        loading: false
      };
    case actionType.LOGOUT:
      localStorage.removeItem('jwtToken');

      return {
        ...state,
        isAuthenticated: false,
        user: {},
        loading: false
      }
    default:
      return state;
  }
};

export default authReducer;