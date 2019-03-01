import React from 'react';
import {Route} from 'react-router-dom';
import {userService} from '../services';
import {Can, Redirect} from '../helpers';

const PrivateRoute = ({component: Component, layout: Layout, perform: perform, ...rest}) => (
  <Route {...rest} render={props => {
    if (userService.isLoggedin()) {
      if (perform) {
        return (
          <Can
            perform={perform}
            yes={() => (
              <Component {...props} />
            )}
            no={() => <Redirect to="/"/>}
          />
        )
      }

      return <Component {...props} />
    }

    //todo: uncomment first version when 'Redirect' function will be fixed for objects
    //return <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
    return <Redirect to='/login'/>
  }}/>
);

export {PrivateRoute};