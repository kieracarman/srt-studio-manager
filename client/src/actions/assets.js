import {
  START_LOADING,
  END_LOADING,
  FETCH_ALL,
  FETCH_ONE,
  CREATE,
  UPDATE,
  DELETE
} from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getAsset = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchAsset(id);

    dispatch({ type: FETCH_ONE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getAssets = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchAssets();

    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createAsset = (asset, router) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.createAsset(asset);

    dispatch({ type: CREATE, payload: data });

    router('/assets');
  } catch (error) {
    console.log(error);
  }
};

export const updateAsset = (id, asset, router) => async (dispatch) => {
  try {
    const { data } = await api.updateAsset(id, asset);

    dispatch({ type: UPDATE, payload: data });

    router('/assets');
  } catch (error) {
    console.log(error);
  }
};

export const deleteAsset = (id, router) => async (dispatch) => {
  try {
    await await api.deleteAsset(id);

    dispatch({ type: DELETE, payload: id });

    router('/assets');
  } catch (error) {
    console.log(error);
  }
};