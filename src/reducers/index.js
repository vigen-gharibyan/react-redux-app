import {combineReducers} from 'redux';
import {titleReducer, syncReduxAndTitle} from 'redux-title';

import intl from './intl.reducer';
import alert from './alert.reducer';
import validation from './validation.reducer';
import authentication from './authentication.reducer';
import registration from './registration.reducer';
import users from './users.reducer';

const rootReducer = combineReducers({
  title: titleReducer,
  intl,
  alert,
  validation,
  authentication,
  registration,
  users,
});

export default rootReducer;