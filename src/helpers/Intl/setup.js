//import Intl from 'intl';
//import areIntlLocalesSupported from 'intl-locales-supported';
import {addLocaleData} from 'react-intl';

//import 'intl/locale-data/jsonp/en';
//import 'intl/locale-data/jsonp/ru';
//import 'intl/locale-data/jsonp/am';
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';
import am from 'react-intl/locale-data/am';
import enData from '../../translations/app/en.json';
import ruData from '../../translations/app/ru.json';
import amData from '../../translations/app/am.json';
import {params} from '../../config';

const {enabledLanguages, languages} = params;
let {defaultLng = 'en'} = params;

// need Intl polyfill, Intl not supported in Safari
/*
if (global.Intl) {
  // Determine if the built-in `Intl` has the locale data we need.
  if (!areIntlLocalesSupported(enabledLanguages)) {
    // `Intl` exists, but it doesn't have the data we need, so load the
    // polyfill and patch the constructors we need with the polyfill's.
    global.Intl.NumberFormat = Intl.NumberFormat;
    global.Intl.DateTimeFormat = Intl.DateTimeFormat;
  }
} else {
  // No `Intl`, so use and load the polyfill.
  global.Intl = Intl;
}
*/

// use this to allow nested messages, taken from docs:
// https://github.com/yahoo/react-intl/wiki/Upgrade-Guide#flatten-messages-object
function flattenMessages(nestedMessages = {}, prefix = '') {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      messages[prefixedKey] = value; // eslint-disable-line no-param-reassign
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});
}

addLocaleData([
  ...en,
  ...ru,
  ...am,
]);

const localizationData = {
  en: flattenMessages(enData),
  ru: flattenMessages(ruData),
  am: flattenMessages(amData),
};

Object.keys(languages).map((key) => {
  if (enabledLanguages.indexOf(key) < 0) {
    delete languages[key];
  }
});

if (!defaultLng || enabledLanguages.indexOf(defaultLng) < 0) {
  if (enabledLanguages.length > 0) {
    defaultLng = enabledLanguages[0];
  }
}

export {
  defaultLng,
  enabledLanguages,
  languages,
  localizationData,
};