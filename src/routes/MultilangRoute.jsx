import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Router, Route, Redirect, Switch} from 'react-router-dom';

import {Routes} from './Routes';
import {intlActions} from '../actions';

class MultilangRoute extends Component {

  getLngFromProps(props) {
    const {match} = props;
    if (match) {
      const {params} = match;
      if (params) {
        const {lng} = params;
        if (lng) {
          return lng;
        }
      }
    }
    return null;
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

  getPathWithoutLang(props) {
    const langPath = this.getUrlFromProps(props);
    const {location} = props;
    if (location) {
      let {pathname, search, hash} = location;

      if (pathname) {
        if (pathname.startsWith(langPath)) {
          pathname = pathname.substring(langPath.length);
          pathname = `${pathname}`;
        }
        return `${pathname}${search}${hash}`;
      }
    }
    return null;
  }

  componentWillMount() {
    const lng = this.getLngFromProps(this.props);
    const pathWithoutLang = this.getPathWithoutLang(this.props);

    this.props.switchLanguage(lng);
    this.props.saveCurrentPath(pathWithoutLang);
  }

  componentWillReceiveProps(nextProps) {
    const currentLng = this.getLngFromProps(this.props);
    const newLng = this.getLngFromProps(nextProps);
    const pathWithoutLang = this.getPathWithoutLang(nextProps);

    if (newLng != currentLng) {
      this.props.switchLanguage(newLng);
    }
    this.props.saveCurrentPath(pathWithoutLang);
  }

  render() {
    const lngPrefix = this.getUrlFromProps(this.props);

    return (
      <Routes lngPrefix={lngPrefix}/>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    switchLanguage: (lng) => {
      dispatch(intlActions.switchLanguage(lng));
    },
    saveCurrentPath: (path) => {
      dispatch(intlActions.saveCurrentPath(path));
    },
  };
}

const connectedMultilangRoute = connect(null, mapDispatchToProps)(MultilangRoute);
export {connectedMultilangRoute as MultilangRoute};