import { combineReducers } from 'redux';

import auth from './auth';
import assets from './assets';
import errors from './errors';

export const reducers = combineReducers({ auth, assets, errors });