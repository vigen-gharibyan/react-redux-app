import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  FormGroup,
  FormText,
  FormFeedback,
  Label,
  Row,
} from 'reactstrap';

import {history} from '../../../../../helpers';
import {userActions, validationActions} from '../../../../../actions';
import {validations, Form, Input, Button as CoreuiButton} from '../../../../../helpers/coreuiValidations';

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: ''
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {changed} = nextProps;

    if(changed) {
      history.push('/profile');
    }
  }

  removeApiError(name) {
    this.props.clearValidationError(name);
  }

  handleChange(event) {
    let {name, value} = event.target;
    const {data} = this.state;
    data[name] = value;
    this.setState({data});
    this.removeApiError(name);
  }

  handleSubmit(event) {
    event.preventDefault();

    this.form.validateAll();
    const {data} = this.state;

    if (1) {
      this.props.changePassword(data);
    }
  }

  render() {
    const {loading} = this.props;
    const {data} = this.state;

    return (
      <div className="animated fadeIn">
        <Col sm="12" md="8" xl="6">
          <Card>
            <Form name="form"
                  noValidate
                  ref={c => {
                    this.form = c
                  }}
                  onSubmit={this.handleSubmit}>
              <CardHeader>
                <strong>Change Password</strong>
              </CardHeader>
              <CardBody>
                <FormGroup>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input type="password"
                         name="currentPassword" id="currentPassword"
                         placeholder="Current Password"
                         autoComplete="Current Password"
                         label="Current Password"
                         icon="icon-lock"
                         value={data.currentPassword}
                         onChange={this.handleChange}
                         apierror={this.props.validation.currentPassword}
                         validations={[validations.required, validations.apiError]}/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input type="password"
                         name="newPassword" id="newPassword"
                         placeholder="New Password"
                         autoComplete="New Password"
                         label="New Password"
                         icon="icon-lock"
                         minLength="6"
                         maxLength="32"
                         match="newPasswordConfirm"
                         value={data.newPassword}
                         onChange={this.handleChange}
                         apierror={this.props.validation.newPassword}
                         validations={[validations.required, validations.lt, validations.gt, validations.password, validations.match]}/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="newPasswordConfirm">Confirm New Password</Label>
                  <Input type="password"
                         name="newPasswordConfirm" id="newPasswordConfirm"
                         placeholder="Confirm New Password"
                         autoComplete="Confirm New Password"
                         label="Confirm New Password"
                         icon="icon-lock"
                         value={data.newPasswordConfirm}
                         onChange={this.handleChange}
                         apierror={this.props.validation.newPasswordConfirm}
                         validations={[validations.required, validations.password, validations.apiError]}/>
                </FormGroup>
              </CardBody>
              <CardFooter>
                <span className="loading-btn-container">
                  <CoreuiButton type="submit" size="sm" color="primary">
                      <i className="fa fa-dot-circle-o"></i> Submit
                  </CoreuiButton>
                  {
                    !!loading &&
                    <img className="loading-img"
                      src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
                  }
                </span>
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {users, validation} = state;
  const {loading, changed} = users;

  return {
    validation,
    loading,
    changed
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changePassword: (data) => {
      dispatch(userActions.changePassword(data));
    },
    clearValidationError: (name) => {
      dispatch(validationActions.clear(name));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
