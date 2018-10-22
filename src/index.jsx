import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import { syncReduxAndTitle } from 'redux-title';

import {store} from './helpers';
import {App} from './App';

// setup fake backend
// import {configureFakeBackend} from './_helpers';
// configureFakeBackend();

syncReduxAndTitle(store);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);