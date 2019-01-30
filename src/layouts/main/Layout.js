import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {Container} from 'reactstrap';
import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';

// sidebar nav config
import navigation from './sections/_nav';

// routes config
import routes from './routes';
import Aside from './sections/Aside';
import Footer from './sections/Footer';
import Header from './sections/Header';
import Notifications from './sections/Notifications';
import {userActions} from '../../actions';
import {PrivateRoute} from '../../helpers';

import './assets/css/style.css';

class Layout extends Component {

  componentWillMount() {
    this.props.getCurrentUser();
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Header />
        </AppHeader>

        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarNav navConfig={navigation} {...this.props} />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes}/>
            <Container fluid>
              <Switch>
                {
                  routes.map((route, idx) => {
                      return route.component ? (
                        <PrivateRoute key={idx}
                                      perform={route.perform}
                                      component={route.component}
                                      path={route.path}
                                      exact={route.exact}
                                      name={route.name}
                        />)
                        : (null);
                    }
                  )
                }
                <Redirect exact from="/" to="/dashboard"/>
                <Redirect from='/*' to='/404'/>
              </Switch>
            </Container>
          </main>
          <AppAside fixed hidden>
            <Aside />
          </AppAside>
        </div>
        <AppFooter>
          <Footer />
        </AppFooter>
        <Notifications />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCurrentUser: () => {
      dispatch(userActions.getCurrent());
    }
  }
}

const connectedLayout = connect(null, mapDispatchToProps)(Layout);
export {connectedLayout as MainLayout};
