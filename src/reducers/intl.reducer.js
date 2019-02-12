import { intlConstants } from '../_constants';
import {enabledLanguages, localizationData} from '../helpers/Intl/setup';

// const initLocale = global.navigator && global.navigator.language.split(/[-_]/)[0] || 'en';
const initLocale = 'ru';

const initialState = {
  enabledLanguages,
  locale: initLocale,
  messages: {
    ...(localizationData[initLocale] || {})
  },
};

const IntlReducer = (state = initialState, action) => {
  switch (action.type) {
    case intlConstants.SWITCH_LANGUAGE: {
      const {type, ...actionWithoutType} = action; // eslint-disable-line
      const {locale} = actionWithoutType;
      const messages = localizationData[locale];

      return {
        ...state,
        locale,
        messages: {...messages}
      };
    }

    default:
      return state;
  }
};

export default IntlReducer;
