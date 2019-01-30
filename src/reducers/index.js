import { combineReducers } from 'redux';
import { titleReducer, syncReduxAndTitle } from 'redux-title';

import authentication from './authentication.reducer';
import registration from './registration.reducer';
import users from './users.reducer';
import alert from './alert.reducer';
import validation from './validation.reducer';

const rootReducer = combineReducers({
  title: titleReducer,
  authentication,
  registration,
  users,
  alert,
  validation
});

export default rootReducer;