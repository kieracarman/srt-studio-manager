import {
  START_LOADING_USERS,
  END_LOADING_USERS,
  FETCH_ALL_USERS,
  FETCH_ONE_USER,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER
} from '../constants/actionTypes'

const initialState = {
  isLoading: false,
  users: []
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING_USERS:
      return { ...state, isLoading: true }
    case END_LOADING_USERS:
      return { ...state, isLoading: false }
    case FETCH_ALL_USERS:
      return { ...state, users: action.payload }
    case FETCH_ONE_USER:
      return { ...state, user: action.payload }
    case CREATE_USER:
      return { ...state, users: [...state.users, action.payload] }
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        )
      }
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload)
      }
    default:
      return state
  }
}

export default usersReducer
