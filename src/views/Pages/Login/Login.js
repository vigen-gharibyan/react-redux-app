import React, {Component} from 'react';
import {updateTitle} from 'redux-title';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  InputGroup as CoreuiInputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';

import {userActions, validationActions} from '../../../actions';
import {
  validations,
  Form,
  Input,
  Button as CoreuiButton,
  LoadingImg
} from '../../../helpers';

import './login.css';

class Login extends Component {

  constructor(props) {
    super(props);

    // reset login status
    this.props.logout();

    this.state = {
      username: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.updateTitle('Login page');
  }

  removeApiError(name) {
    this.props.clearValidationError();
  }

  handleChange(e) {
    const {name, value} = e.target;
    this.setState({[name]: value});
    this.removeApiError(name);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.form.validateAll();
    const {username, password} = this.state;
    if (1) {
      this.props.login(username, password);
    }
  }

  render() {
    const {loggingIn} = this.props;
    const {username, password} = this.state;
    const {title} = this.props;

    return (
      <div className="login-section">
        <Row className="justify-content-center">
          <Col md="8" sm="12">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <Form name="form"
                        noValidate
                        ref={c => {
                          this.form = c
                        }}
                        onSubmit={this.handleSubmit}>
                    <h1>Login</h1>

                    <p className="text-muted">Sign In to your account</p>

                    <div className="mb-4">
                      <Input type="text"
                             name="username" id="username"
                             placeholder="Username"
                             autoComplete="username"
                             label="Username"
                             icon="icon-user"
                             value={username}
                             onChange={this.handleChange}
                             apierror={this.props.validation.username}
                             validations={[validations.required, validations.apiError]}/>
                    </div>

                    <div className="mb-4">
                      <Input type="password"
                             name="password" id="password"
                             placeholder="Password"
                             autoComplete="current-password"
                             minLength="6" maxLength="32"
                             label="Password"
                             icon="icon-lock"
                             value={password}
                             onChange={this.handleChange}
                             apierror={this.props.validation.password}
                             validations={[validations.required, validations.lt, validations.gt, validations.apiError]}/>
                    </div>

                    <Row>
                      <Col sm="12" md="6">
                        <span className="loading-btn-container">
                          <CoreuiButton color="primary" className="px-4">Login</CoreuiButton>
                          <LoadingImg loading={loggingIn} />
                        </span>
                      </Col>
                      <Col sm="12" md="6" className="right-section">
                        <Link to="/">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Link>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
              <Card className="text-white bg-primary py-5 d-md-down-none" style={{width: 44 + '%'}}>
                <CardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                      do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <Button color="primary" className="mt-3" active>Register Now!</Button>
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {loggingIn} = state.authentication;
  const {title, validation} = state;
  return {
    title,
    loggingIn,
    validation
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateTitle: (title) => {
      dispatch(updateTitle(title));
    },
    clearValidationError: (name) => {
      dispatch(validationActions.clear(name));
    },
    login: (username, password) => {
      dispatch(userActions.login(username, password));
    },
    logout: () => {
      dispatch(userActions.logout());
    }
  };
}

const connectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);
export {connectedLogin as Login};

