import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {syncReduxAndTitle} from 'redux-title';

import {store} from './helpers';
import IntlWrapper from './helpers/Intl/IntlWrapper';
import {App} from './App';

syncReduxAndTitle(store);

render(
  <Provider store={store}>
    <IntlWrapper>
      <App />
    </IntlWrapper>
  </Provider>,
  document.getElementById('app')
);