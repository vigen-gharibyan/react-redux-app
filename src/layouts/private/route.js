import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {userService} from '../../services';
//import {PrivateLayout} from './Layout';

const PrivateRoute = ({component: Component, layout: Layout, ...rest}) => (
    <Route {...rest} render={props => (
        userService.isLoggedin()
            ?
            <Component {...props} />
            :
            <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
    )}/>
);

export {PrivateRoute};