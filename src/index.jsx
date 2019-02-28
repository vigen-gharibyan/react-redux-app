import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {syncReduxAndTitle} from 'redux-title';

import {store} from './helpers';
import {App} from './App';

syncReduxAndTitle(store);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);