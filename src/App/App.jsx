import React from 'react';
import {Router} from 'react-router-dom';

import {MultilangRoutes} from '../routes';
import {Routes} from '../routes';
import {history} from '../helpers';

// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../scss/style.css';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <MultilangRoutes/>
      </Router>
    );
  }
}

export {App};