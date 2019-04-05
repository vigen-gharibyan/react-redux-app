import {intlConstants} from '../_constants';
import {defaultLng, enabledLanguages, localizationData} from '../helpers/Intl/setup';

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

      if (!locale || !(enabledLanguages.includes(locale))) {
        locale = defaultLng;
      }

      const messages = localizationData[locale];

      return {
        ...state,
        locale,
        messages: {...messages},
      };
    }

    case intlConstants.SAVE_CURRENT_PATH: {
      const {type, ...actionWithoutType} = action; // eslint-disable-line
      const {currentPath} = actionWithoutType;

      return {
        ...state,
        currentPath,
      }
    }

    default:
      return state;
  }
};

export default IntlReducer;
