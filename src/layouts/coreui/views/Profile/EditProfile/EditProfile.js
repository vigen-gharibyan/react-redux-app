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

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: '',
        email: ''
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentWillMount() {
    this.props.getCurrentUser();
  }

  componentWillReceiveProps(nextProps) {
    const {user, updated} = nextProps;
    if (user) {
      this.setState({user});
    }

    if(updated) {
      history.push('/profile');
    }
  }

  removeApiError(name) {
    this.props.clearValidationError(name);
  }

  handleChange(event) {
    let {name, value} = event.target;

    if (event.target.type === 'checkbox') {
      value = event.target.checked;
    }

    const {user} = this.state;
    user[name] = value;
    this.setState({user});
    this.removeApiError(name);
  }

  handleSubmit(event) {
    event.preventDefault();

    this.form.validateAll();
    const {user} = this.state;

    if (1) {
      this.props.updateCurrentUser(user);
    }
  }

  handleReset(event) {
    console.log('reset ...')
  }

  render() {
    const {user} = this.state;

    return (
      <div className="animated fadeIn">
        <Col xs="12" md="6">
          <Card>
            <Form name="form"
                  noValidate
                  ref={c => {
                    this.form = c
                  }}
                  onSubmit={this.handleSubmit}>
              <CardHeader>
                <strong>Profile</strong>
              </CardHeader>
              <CardBody>
                <FormGroup>
                  <Label htmlFor="nf-email">Username</Label>
                  <Input type="text"
                         name="username" id="username"
                         placeholder="Username"
                         autoComplete="username"
                         label="Username"
                         value={user.username}
                         onChange={this.handleChange}
                         apierror={this.props.validation.username}
                         validations={[validations.required, validations.apiError]}/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="nf-email">Email</Label>
                  <Input type="text"
                         name="email" id="email"
                         placeholder="Email"
                         autoComplete="email"
                         label="Email"
                         value={user.email}
                         onChange={this.handleChange}
                         apierror={this.props.validation.email}
                         validations={[validations.required, validations.email, validations.apiError]}/>
                </FormGroup>
              </CardBody>
              <CardFooter>
                <CoreuiButton type="submit" size="sm" color="primary">
                  <i className="fa fa-dot-circle-o"></i> Submit
                </CoreuiButton>
                <Button onClick={this.handleReset} type="reset" size="sm" color="danger">
                  <i className="fa fa-ban"></i> Reset
                </Button>
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
  const {user, updated} = users;

  return {
    validation,
    user,
    updated
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCurrentUser: () => {
      dispatch(userActions.getCurrent());
    },
    updateCurrentUser: (user) => {
      dispatch(userActions.updateCurrent(user));
    },
    clearValidationError: (name) => {
      dispatch(validationActions.clear(name));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
