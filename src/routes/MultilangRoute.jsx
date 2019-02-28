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

  componentWillMount() {
    const lng = this.getLngFromProps(this.props);
    this.props.switchLanguage(lng);
  }

  componentWillReceiveProps(nextProps) {
    const currentLng = this.getLngFromProps(this.props);
    const newLng = this.getLngFromProps(nextProps);

    if (newLng != currentLng) {
      this.props.switchLanguage(newLng);
    }
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
  };
}

const connectedMultilangRoute = connect(null, mapDispatchToProps)(MultilangRoute);
export {connectedMultilangRoute as MultilangRoute};