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

import Routes, {routes, routesWithPrefix} from './Routes';
import navigation from './sections/_nav';
import Aside from './sections/Aside';
import Footer from './sections/Footer';
import Header from './sections/Header';
import Notifications from './sections/Notifications';
import {userActions} from '../../actions';
import {addPrefixToRoutes} from '../../helpers';

import './assets/css/style.css';

class Layout extends Component {

  componentWillMount() {
    this.props.getCurrentUser();
  }

  getUrlFromProps(props) {
    const {match} = props;
    if (match) {
      const {url} = match;
      if (url) {
        return url;
      }
    }
    return null;
  }

  render() {
    const {currentLng} = this.props;
    const lngPrefix = this.getUrlFromProps(this.props);

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
            <AppBreadcrumb appRoutes={routesWithPrefix}/>
            <Container fluid>
              <Routes lngPrefix={lngPrefix}/>
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

function mapStateToProps(state) {
  const {
    intl: {locale},
  } = state;

  return {currentLng: locale};
}

function mapDispatchToProps(dispatch) {
  return {
    getCurrentUser: () => {
      dispatch(userActions.getCurrent());
    }
  }
}

const connectedLayout = connect(mapStateToProps, mapDispatchToProps)(Layout);
export {connectedLayout as MainLayout};
