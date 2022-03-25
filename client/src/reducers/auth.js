import isEmpty from 'is-empty';
import jwt_decode from 'jwt-decode';

import * as actionType from '../constants/actionTypes';

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.LOGIN:
      localStorage.setItem('jwtToken', action.token);

      // Decode token to get user data
      const decoded = jwt_decode(action.token);

      return {
        ...state,
        isAuthenticated: !isEmpty(action.token),
        user: decoded,
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