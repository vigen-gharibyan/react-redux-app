import React, {Component} from 'react';
import {connect} from 'react-redux';
import {DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';

import {AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler} from '@coreui/react';
import {languages, Link} from "../../../helpers";

const propTypes = {};
const defaultProps = {};

class LanguagesDropdown extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentLanguage: {
        locale: null,
        name: null,
        icon: null,
      },
    }
  }

  componentWillReceiveProps(nextProps) {
    const {currentLanguage} = nextProps;

    if (currentLanguage) {
      this.setState({currentLanguage});
    }
  }

  render() {
    const {currentLanguage} = this.props;
    const {currentPath} = this.props;

    return (
      <AppHeaderDropdown direction="down">
        <DropdownToggle nav>
          <i className={`flag-icon flag-icon-${currentLanguage.icon}`} title={currentLanguage.name}></i>
        </DropdownToggle>

        <DropdownMenu right style={{right: 'auto'}}>
          {Object.keys(languages).map((index, key) => {
            const language = languages[index];

            if (language.locale != currentLanguage.locale) {
              return (
                <DropdownItem key={key}>
                  <Link lang={`${language.locale}`} to={currentPath}>
                    <i className={`flag-icon flag-icon-${language.icon}`}></i> {language.name}
                  </Link>
                </DropdownItem>
              );
            }

            return;
          })}
        </DropdownMenu>
      </AppHeaderDropdown>
    );
  }
}

LanguagesDropdown.propTypes = propTypes;
LanguagesDropdown.defaultProps = defaultProps;

function mapStateToProps(state) {
  const {
    intl: {
      locale,
      currentPath,
    }
  } = state;

  const currentLanguage = languages[locale];

  return {
    currentLanguage,
    currentPath,
  };
}

export default connect(mapStateToProps)(LanguagesDropdown);
