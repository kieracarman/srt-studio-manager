import {
  START_LOADING_TICKETS,
  END_LOADING_TICKETS,
  FETCH_ALL_TICKETS,
  FETCH_ONE_TICKET,
  CREATE_TICKET,
  UPDATE_TICKET,
  DELETE_TICKET,
  GET_ERRORS
} from '../constants/actionTypes'
import * as api from '../api/index.js'

export const getTicket = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_TICKETS })

    const { data } = await api.fetchTicket(id)

    dispatch({ type: FETCH_ONE_TICKET, payload: data })
    dispatch({ type: END_LOADING_TICKETS })
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error })
  }
}

export const getTickets = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_TICKETS })

    const { data } = await api.fetchTickets()

    dispatch({ type: FETCH_ALL_TICKETS, payload: data })
    dispatch({ type: END_LOADING_TICKETS })
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error })
  }
}

export const createTicket = (ticket, router) => async (dispatch) => {
  try {
    const { data } = await api.createTicket(ticket)

    dispatch({ type: CREATE_TICKET, payload: data })

    router('/tickets')
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error })
  }
}

export const updateTicket = (id, ticket, router) => async (dispatch) => {
  try {
    const { data } = await api.updateTicket(id, ticket)

    dispatch({ type: UPDATE_TICKET, payload: data })

    router('/tickets')
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error })
  }
}

export const deleteTicket = (id, router) => async (dispatch) => {
  try {
    await api.deleteTicket(id)

    dispatch({ type: DELETE_TICKET, payload: id })

    router('/tickets')
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error })
  }
}
