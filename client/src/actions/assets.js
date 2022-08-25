import {
  START_LOADING_ASSETS,
  END_LOADING_ASSETS,
  FETCH_ALL_ASSETS,
  FETCH_ONE_ASSET,
  CREATE_ASSET,
  UPDATE_ASSET,
  DELETE_ASSET
} from '../constants/actionTypes'
import * as api from '../api/index.js'

export const getAsset = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_ASSETS })

    const { data } = await api.fetchAsset(id)

    dispatch({ type: FETCH_ONE_ASSET, payload: data })
    dispatch({ type: END_LOADING_ASSETS })
  } catch (error) {
    console.log(error)
  }
}

export const getAssets = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_ASSETS })

    const { data } = await api.fetchAssets()

    dispatch({ type: FETCH_ALL_ASSETS, payload: data })
    dispatch({ type: END_LOADING_ASSETS })
  } catch (error) {
    console.log(error)
  }
}

export const createAsset = (asset, router) => async (dispatch) => {
  try {
    const { data } = await api.createAsset(asset)

    dispatch({ type: CREATE_ASSET, payload: data })

    router('/assets')
  } catch (error) {
    console.log(error)
  }
}

export const updateAsset = (id, asset, router) => async (dispatch) => {
  try {
    const { data } = await api.updateAsset(id, asset)

    dispatch({ type: UPDATE_ASSET, payload: data })

    router('/assets')
  } catch (error) {
    console.log(error)
  }
}

export const deleteAsset = (id, router) => async (dispatch) => {
  try {
    await api.deleteAsset(id)

    dispatch({ type: DELETE_ASSET, payload: id })

    router('/assets')
  } catch (error) {
    console.log(error)
  }
}
