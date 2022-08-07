import {
  START_LOADING_BOOKINGS,
  END_LOADING_BOOKINGS,
  FETCH_ALL_BOOKINGS,
  FETCH_ONE_BOOKING,
  CREATE_BOOKING,
  UPDATE_BOOKING,
  DELETE_BOOKING
} from '../constants/actionTypes';

const initialState = {
  isLoading: false,
  bookings: []
};

const bookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING_BOOKINGS:
      return { ...state, isLoading: true };
    case END_LOADING_BOOKINGS:
      return { ...state, isLoading: false };
    case FETCH_ALL_BOOKINGS:
      return { ...state, bookings: action.payload };
    case FETCH_ONE_BOOKING:
      return { ...state, booking: action.payload };
    case CREATE_BOOKING:
      return { ...state, bookings: [...state.bookings, action.payload] };
    case UPDATE_BOOKING:
      return { ...state, bookings: state.bookings.map((booking) => (booking._id === action.payload._id ? action.payload : booking)) };
    case DELETE_BOOKING:
      return { ...state, bookings: state.bookings.filter((booking) => booking._id !== action.payload) };
    default:
      return state;
  }
};

export default bookingsReducer;