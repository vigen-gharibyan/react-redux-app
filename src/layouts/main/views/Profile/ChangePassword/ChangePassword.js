import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  FormGroup,
  Label,
  Row
} from 'reactstrap';

import {history} from '../../../../../helpers';
import {userActions, validationActions} from '../../../../../actions';
import {validations, Form, Input, Button as CoreuiButton, LoadingImg} from '../../../../../helpers';

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
    const {passwordChanged} = nextProps;

    if (passwordChanged) {
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
                <i className="fa fa-unlock-alt"></i> <strong>Change Password</strong>
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
                  <LoadingImg loading={loading}/>
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
  const {
    validation,
    users: {
      changePasswordLoading,
      passwordChanged
    }
  } = state;

  return {
    loading: changePasswordLoading,
    validation,
    passwordChanged
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
