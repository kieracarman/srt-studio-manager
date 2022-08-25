import {
  START_LOADING_BOOKINGS,
  END_LOADING_BOOKINGS,
  FETCH_ALL_BOOKINGS,
  FETCH_ONE_BOOKING,
  CREATE_BOOKING,
  UPDATE_BOOKING,
  DELETE_BOOKING,
  GET_ERRORS
} from '../constants/actionTypes'
import * as api from '../api/index.js'

export const getBooking = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_BOOKINGS })

    const { data } = await api.fetchBooking(id)

    dispatch({ type: FETCH_ONE_BOOKING, payload: data })
    dispatch({ type: END_LOADING_BOOKINGS })
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error })
  }
}

export const getBookings = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_BOOKINGS })

    const { data } = await api.fetchBookings()

    dispatch({ type: FETCH_ALL_BOOKINGS, payload: data })
    dispatch({ type: END_LOADING_BOOKINGS })
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error })
  }
}

export const createBooking = (booking, router) => async (dispatch) => {
  try {
    const { data } = await api.createBooking(booking)

    dispatch({ type: CREATE_BOOKING, payload: data })

    router('/bookings')
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error })
  }
}

export const updateBooking = (id, booking, router) => async (dispatch) => {
  try {
    const { data } = await api.updateBooking(id, booking)

    dispatch({ type: UPDATE_BOOKING, payload: data })

    router('/bookings')
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error })
  }
}

export const deleteBooking = (id, router) => async (dispatch) => {
  try {
    await api.deleteBooking(id)

    dispatch({ type: DELETE_BOOKING, payload: id })

    router('/bookings')
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error })
  }
}
