import {params} from '../../config';
import {IntlWrapper} from './IntlWrapper';
import {Link, NavLink, Redirect} from './Link';
import redirect from './redirect';

const {languages, defaultLng} = params;

export {
  IntlWrapper,
  defaultLng,
  languages,
  Link,
  NavLink,
  Redirect,
  redirect
};
