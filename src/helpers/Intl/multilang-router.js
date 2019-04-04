import React from 'react';

import {Link, NavLink, Redirect} from 'react-router-dom';

import {store} from '../store';
import {params} from '../../config';
import {history} from '../history';

const {languages, defaultLng} = params;

const addPrefixToRoutes = (routes, lngPrefix) => {
  let newRoutes = routes.map((route, idx) => {
    let newRoute = {...route};
    const path = `${lngPrefix}${route.path}`;
    newRoute.path = path;

    return newRoute;
  });

  return newRoutes;
};

const getLink = (to, lang) => {
  const state = store.getState();
  const {intl: {locale}} = state;
  const currentLang = locale;

  //todo: check if 'to' is string
  let link = to;
  if (lang) {
    link = `/${lang}${to}`;
  } else {
    if (currentLang != defaultLng) {
      link = `/${currentLang}${to}`;
    }
  }

  return link;
}

const IntlLink = ({to, lang, ...props}) => {
  const link = getLink(to, lang);

  return (
    <Link to={link}>{props.children}</Link>
  );
}

const IntlNavLink = ({to, lang, ...props}) => {
  const link = getLink(to, lang);

  return (
    <NavLink to={link}>{props.children}</NavLink>
  );
}

const IntlRedirect = ({to, lang, ...props}) => {
  const link = getLink(to, lang);

  return (
    <Redirect to={link} {...props}/>
  );
}

const redirect = (to, lang) => {
  const link = getLink(to, lang);

  return history.push(link);
};

export {
  getLink,
  IntlLink as Link,
  IntlNavLink as NavLink,
  IntlRedirect as Redirect,
  redirect,
  addPrefixToRoutes,
};
