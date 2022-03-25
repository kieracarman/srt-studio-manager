import { combineReducers } from 'redux';

import auth from './auth';
import errors from './errors';

export const reducers = combineReducers({ auth, errors });