import React from 'react';

import getLink from './Link';
import {history} from '../../helpers';

export default function (to, lang) {
  const link = getLink(to, lang);

  return history.push(link);
};
