import {
  START_LOADING_TICKETS,
  END_LOADING_TICKETS,
  FETCH_ALL_TICKETS,
  FETCH_ONE_TICKET,
  CREATE_TICKET,
  UPDATE_TICKET,
  DELETE_TICKET
} from '../constants/actionTypes'

const initialState = {
  isLoading: false,
  tickets: []
}

const ticketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING_TICKETS:
      return { ...state, isLoading: true }
    case END_LOADING_TICKETS:
      return { ...state, isLoading: false }
    case FETCH_ALL_TICKETS:
      return { ...state, tickets: action.payload }
    case FETCH_ONE_TICKET:
      return { ...state, ticket: action.payload }
    case CREATE_TICKET:
      return { ...state, tickets: [...state.tickets, action.payload] }
    case UPDATE_TICKET:
      return {
        ...state,
        tickets: state.tickets.map((ticket) =>
          ticket._id === action.payload._id ? action.payload : ticket
        )
      }
    case DELETE_TICKET:
      return {
        ...state,
        tickets: state.tickets.filter((ticket) => ticket._id !== action.payload)
      }
    default:
      return state
  }
}

export default ticketsReducer
