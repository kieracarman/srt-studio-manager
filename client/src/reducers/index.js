import { combineReducers } from 'redux';

import auth from './auth';
import users from './users';
import assets from './assets';
import errors from './errors';

export const reducers = combineReducers({ auth, users, assets, errors });