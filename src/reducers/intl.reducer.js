import {intlConstants} from '../_constants';
import {enabledLanguages, localizationData} from '../helpers/Intl/setup';
import {defaultLng} from '../helpers';

// const defaultLng = global.navigator && global.navigator.language.split(/[-_]/)[0] || 'en';

const initialState = {
  enabledLanguages,
  locale: defaultLng,
  messages: {
    ...(localizationData[defaultLng] || {})
  },
};

const IntlReducer = (state = initialState, action) => {
  switch (action.type) {
    case intlConstants.SWITCH_LANGUAGE: {
      const {type, ...actionWithoutType} = action; // eslint-disable-line
      let {locale} = actionWithoutType;

      //todo: check if is included in enabled languages too
      if (!locale) {
        locale = defaultLng;
      }

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
