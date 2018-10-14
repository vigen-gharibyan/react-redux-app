import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';

import {history} from './helpers';
import {PublicRoute} from './layouts';
import {PrivateRoute} from './layouts';
import { Login, Page404, Page500, Register } from './layouts/public/views/Pages';
import {CoreuiLayout} from './layouts';

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
                    <PublicRoute path="/404" component={Page404}/>
                    <PublicRoute path="/500" component={Page500}/>
                    <PublicRoute path="/login" component={Login}/>
                    <PublicRoute path="/register" component={Register}/>
                    <PrivateRoute path="/" component={CoreuiLayout}/>
                </Switch>
            </Router>
        )
    }
}

export default Routes;