import {
  START_LOADING_USERS,
  END_LOADING_USERS,
  FETCH_ALL_USERS,
  FETCH_ONE_USER,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  GET_ERRORS
} from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_USERS });
    
    const { data } = await api.fetchUser(id);
    
    dispatch({ type: FETCH_ONE_USER, payload: data });
    dispatch({ type: END_LOADING_USERS });
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error });
  };
};

export const getUsers = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_USERS });

    const { data } = await api.fetchUsers();

    dispatch({ type: FETCH_ALL_USERS, payload: data });
    dispatch({ type: END_LOADING_USERS });
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error });
  };
};

export const createUser = (user, router) => async (dispatch) => {
  try {
    const { data } = await api.createUser(user);

    const { password, ...dataWithoutPassword } = data;
    
    dispatch({ type: CREATE_USER, payload: dataWithoutPassword });
    
    router('/users');
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error });
  };
};

export const updateUser = (id, user, router) => async (dispatch) => {
  try {
    const { password, ...userWithoutPassword } = user;

    if (user.password !== '') {
      await api.updateUser(id, user);
    } else {
      await api.updateUser(id, userWithoutPassword);
    }

    dispatch({ type: UPDATE_USER, payload: userWithoutPassword });

    router('/users');
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error });
  };
};

export const deleteUser = (id, router) => async (dispatch) => {
  try {
    await api.deleteUser(id);
    
    dispatch({ type: DELETE_USER, payload: id });
    
    router('/users');
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error });
  };
};