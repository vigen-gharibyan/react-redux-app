import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {userService} from '../../services';
import {Can} from '../../helpers';

const PrivateRoute = ({component: Component, layout: Layout, perform: perform, ...rest}) => (
  <Route {...rest} render={props => {
    if (userService.isLoggedin()) {
      if(perform) {
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

    return <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
  }}/>
);

export {PrivateRoute};