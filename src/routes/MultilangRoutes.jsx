import React, {Component} from 'react';
import {Router, Route, Redirect, Switch} from 'react-router-dom';

import {languages} from '../helpers';
import {MultilangRoute} from './MultilangRoute';

class MultilangRoutes extends Component {

  render() {
    const langs = Object.keys(languages);
    const langsString = langs.join('|');

    let path = '';
    if (langs.length > 1) {
      path = `/:lng(${langsString})?`;
    }

    return (
      <Route path={path} component={MultilangRoute}/>
    );
  }
}

export {MultilangRoutes};