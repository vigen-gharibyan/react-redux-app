import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import {DefaultLayout} from './Layout';

const DefaultRoute = ({component: Component, layout: Layout, ...rest}) => (
  <Route {...rest} render={props => (
    <DefaultLayout>
      <Component {...props} />
    </DefaultLayout>
  )}/>
);

export {DefaultRoute};