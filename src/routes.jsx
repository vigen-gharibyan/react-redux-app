import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';

import {history} from './helpers';
import {DefaultRoute, MainLayout} from './layouts';
import {Login, Page404, Page500, Register} from './components/views/Pages';

/*
 import {HomePage} from './components/HomePage';
 import {LoginPage} from './components/LoginPage';
 import {RegisterPage} from './components/RegisterPage';
 */

class Routes extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <DefaultRoute path="/404" component={Page404}/>
          <DefaultRoute path="/500" component={Page500}/>
          <DefaultRoute path="/login" component={Login}/>
          <DefaultRoute path="/register" component={Register}/>
          <Route path="/" component={MainLayout}/>
        </Switch>
      </Router>
    )
  }
}

export default Routes;