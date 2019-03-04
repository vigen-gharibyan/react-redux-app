import {intlConstants} from '../_constants';
//import { localizationData } from '../helpers/Intl/setup';

export const intlActions = {
  switchLanguage,
  saveCurrentPath,
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

function saveCurrentPath(path) {
  return {
    type: intlConstants.SAVE_CURRENT_PATH,
    currentPath: path,
  };
}
