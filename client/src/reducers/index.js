import { combineReducers } from 'redux';

import auth from './auth';
import users from './users';
import assets from './assets';
import tickets from './tickets';
import errors from './errors';

export const reducers = combineReducers({ auth, users, assets, tickets, errors });