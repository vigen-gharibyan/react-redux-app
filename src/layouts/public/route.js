import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import {PublicLayout} from './Layout';

const PublicRoute = ({ component: Component, layout: Layout, ...rest }) => (
    <Route {...rest} render={props => (
        <PublicLayout>
            <Component {...props} />
        </PublicLayout>
    )}/>
);

export {PublicRoute};