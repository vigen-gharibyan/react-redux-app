import React from 'react';
import {Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import {history} from '../_helpers';
import {alertActions} from '../_actions';
import {PrivateRoute} from '../_components';
import {HomePage} from '../HomePage';
import {LoginPage} from '../LoginPage';
import {RegisterPage} from '../RegisterPage';

class App extends React.Component {
    constructor(props) {
        super(props);

        const {dispatch} = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const {alert} = this.props;
        return (
            <div className="wrapper">
                <div className="jumbotron">
                    <div className="container">
                        <div className="col-sm-8 col-sm-offset-2">
                            {
                                alert.message &&
                                <div className={`alert ${alert.type}`}>{alert.message}</div>
                            }
                            <Router history={history}>
                                <div>
                                    <PrivateRoute exact path="/" component={HomePage}/>
                                    <Route path="/login" component={LoginPage}/>
                                    <Route path="/register" component={RegisterPage}/>
                                </div>
                            </Router>
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <p>
                        <a href="http://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example"
                           target="_top">React + Redux - User Registration and Login Tutorial & Example</a>
                    </p>
                    <p>
                        <a href="http://jasonwatmore.com" target="_top">JasonWatmore.com</a>
                    </p>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {alert} = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export {connectedApp as App};