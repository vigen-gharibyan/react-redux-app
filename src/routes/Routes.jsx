import React, {Component} from 'react';
import {Router, Route, Redirect, Switch} from 'react-router-dom';

import IntlWrapper from '../helpers/Intl/IntlWrapper';
import {DefaultRoute, MainLayout} from '../layouts';
import {Login, Page404, Page500, Register} from '../views/Pages';

class Routes extends Component {
  render() {
    let {lngPrefix} = this.props;
    if (!lngPrefix) {
      lngPrefix = '';
    }

    return (
      <IntlWrapper>
        <Switch>
          <DefaultRoute path={`${lngPrefix}/404`} component={Page404}/>
          <DefaultRoute path={`${lngPrefix}/500`} component={Page500}/>
          <DefaultRoute path={`${lngPrefix}/login`} component={Login}/>
          <DefaultRoute path={`${lngPrefix}/register`} component={Register}/>
          <Route path={`${lngPrefix}/`} component={MainLayout}/>
          <Redirect from='*' to={`${lngPrefix}/404`}/>
        </Switch>
      </IntlWrapper>
    )
  }
}

export {Routes};
