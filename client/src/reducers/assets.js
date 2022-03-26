import {
  START_LOADING,
  END_LOADING,
  FETCH_ALL,
  FETCH_ONE,
  CREATE,
  UPDATE,
  DELETE,
} from '../constants/actionTypes';

const initialState = {
  isLoading: false,
  assets: []
}

const assetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return { ...state, assets: action.payload };
    case FETCH_ONE:
      return { ...state, asset: action.payload };
    case CREATE:
      return { ...state, assets: [...state.assets, action.payload] };
    case UPDATE:
      return { ...state, assets: state.assets.map((asset) => (asset._id === action.payload._id ? action.payload : asset)) };
    case DELETE:
      return { ...state, assets: state.assets.filter((asset) => asset._id !== action.payload) };
    default:
      return state;
  }
};

export default assetsReducer;