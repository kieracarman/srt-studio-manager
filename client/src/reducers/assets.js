import {
  START_LOADING_ASSETS,
  END_LOADING_ASSETS,
  FETCH_ALL_ASSETS,
  FETCH_ONE_ASSET,
  CREATE_ASSET,
  UPDATE_ASSET,
  DELETE_ASSET,
} from '../constants/actionTypes';

const initialState = {
  isLoading: false,
  assets: []
}

const assetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING_ASSETS:
      return { ...state, isLoading: true };
    case END_LOADING_ASSETS:
      return { ...state, isLoading: false };
    case FETCH_ALL_ASSETS:
      return { ...state, assets: action.payload };
    case FETCH_ONE_ASSET:
      return { ...state, asset: action.payload };
    case CREATE_ASSET:
      return { ...state, assets: [...state.assets, action.payload] };
    case UPDATE_ASSET:
      return { ...state, assets: state.assets.map((asset) => (asset._id === action.payload._id ? action.payload : asset)) };
    case DELETE_ASSET:
      return { ...state, assets: state.assets.filter((asset) => asset._id !== action.payload) };
    default:
      return state;
  }
};

export default assetsReducer;