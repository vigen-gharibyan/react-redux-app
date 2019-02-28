import React, {Component} from 'react';
import {Router, Route, Redirect, Switch} from 'react-router-dom';

import {MultilangRoute} from './MultilangRoute';

class MultilangRoutes extends Component {
  render() {
    return (
      <Route path="/:lng(am|en|ru)?" component={MultilangRoute}/>
    );
  }
}

export {MultilangRoutes};