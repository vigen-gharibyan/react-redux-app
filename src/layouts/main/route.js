import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import {CoreuiLayout} from './Layout';

const ThisRoute = ({component: Component, layout: Layout, ...rest}) => (
  <Route {...rest} render={props => (
    <CoreuiLayout>
      <Component {...props} />
    </CoreuiLayout>
  )}/>
);

export {ThisRoute as CoreuiRoute};