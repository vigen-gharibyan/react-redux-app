import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem} from 'reactstrap';
import PropTypes from 'prop-types';

import {AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler} from '@coreui/react';

import {Can, Link, NavLink} from "../../../helpers";
import {url, defaultProfileImg} from "../../../helpers";
import {languages} from "../../../helpers";
import LanguagesDropdown from './LanguagesDropdown';

import logo from '../assets/img/brand/logo.svg';
import sygnet from '../assets/img/brand/sygnet.svg';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: {
        username: '',
        email: '',
        photo: ''
      },
    }
  }

  componentWillReceiveProps(nextProps) {
    const {currentUser} = nextProps;
    if (currentUser) {
      this.setState({currentUser});
    }
  }

  render() {
    // eslint-disable-next-line
    // const {children, ...attributes} = this.props;
    const {currentUser} = this.state;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile/>
        <AppNavbarBrand
          full={{src: logo, width: 89, height: 25, alt: 'CoreUI Logo'}}
          minimized={{src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo'}}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg"/>

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/">
              <FormattedMessage id="Dashboard"></FormattedMessage>
            </NavLink>
          </NavItem>

          <Can
            perform="users:list"
            yes={() => (
              <NavItem className="px-3">
                <NavLink to="/users?sort=-created_at&status=10">
                  <FormattedMessage id="Users"></FormattedMessage>
                </NavLink>
              </NavItem>
            )}
          />

          <NavItem className="px-3">
            <NavLink to="/settings">
              <FormattedMessage id="Settings"></FormattedMessage>
            </NavLink>
          </NavItem>
        </Nav>

        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <NavLink to="#">
              <i className="icon-bell"></i><Badge pill color="danger">5</Badge>
            </NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink to="#">
              <i className="icon-list"></i>
            </NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink to="#">
              <i className="icon-location-pin"></i>
            </NavLink>
          </NavItem>

          {
            (Object.keys(languages).length > 1) &&
            <LanguagesDropdown />
          }

          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={ url(currentUser.photo) || defaultProfileImg }
                   className="img-avatar"
                   alt={currentUser.email}
                   title={currentUser.username}/>
            </DropdownToggle>
            <DropdownMenu right style={{right: 'auto'}}>
              <DropdownItem header tag="div" className="text-center">
                <strong><FormattedMessage id="Account"></FormattedMessage></strong>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge>
              </DropdownItem>
              <DropdownItem header tag="div" className="text-center">
                <strong><FormattedMessage id="Settings"></FormattedMessage></strong>
              </DropdownItem>
              <DropdownItem>
                <Link to="/profile">
                  <i className="fa fa-user"></i> <FormattedMessage id="Profile"></FormattedMessage>
                </Link>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-wrench"></i> <FormattedMessage id="Settings"></FormattedMessage>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge>
              </DropdownItem>
              <DropdownItem divider/>
              <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem>
              <DropdownItem>
                <Link to="/login">
                  <i className="fa fa-lock"></i> <FormattedMessage id="Logout"></FormattedMessage>
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        <AppAsideToggler className="d-md-down-none"/>
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

function mapStateToProps(state) {
  const {
    users: {currentUser},
    intl: {locale},
  } = state;

  return {
    currentUser,
    locale,
  };
}

export default connect(mapStateToProps)(Header);
