import {intlConstants} from '../_constants';
//import { localizationData } from '../helpers/Intl/setup';

export const intlActions = {
  switchLanguage
}

function switchLanguage(newLang) {
  return {
    type: intlConstants.SWITCH_LANGUAGE,
    locale: newLang,
    /*
    messages: {
      ...localizationData[newLang]
    },
    */
  };
}
