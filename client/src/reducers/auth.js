import isEmpty from 'is-empty';

import * as actionType from '../constants/actionTypes';

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case actionType.USER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export default authReducer;