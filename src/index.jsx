import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {syncReduxAndTitle} from 'redux-title';
import {IntlProvider} from "react-intl";
import { addLocaleData } from "react-intl";
import locale_en from 'react-intl/locale-data/en';
import locale_ru from 'react-intl/locale-data/ru';
import locale_am from 'react-intl/locale-data/am';

import {store} from './helpers';
import {App} from './App';
import messages_en from "./translations/en.json";
import messages_ru from "./translations/ru.json";
import messages_am from "./translations/am.json";

addLocaleData([
  ...locale_en,
  ...locale_ru,
  ...locale_am
]);
const messages = {
  'en': messages_en,
  'ru': messages_ru,
  'am': messages_am
};

// const language = navigator.language.split(/[-_]/)[0];  // language without region code
const language = 'ru';

// setup fake backend
// import {configureFakeBackend} from './_helpers';
// configureFakeBackend();

syncReduxAndTitle(store);

render(
  <Provider store={store}>
    <IntlProvider locale={language} messages={messages[language]}>
      <App />
    </IntlProvider>
  </Provider>,
  document.getElementById('app')
);