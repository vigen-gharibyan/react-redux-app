import React, {Component} from 'react';
import {updateTitle} from 'redux-title';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  CardFooter,
  Col,
  Container,
  Row
} from 'reactstrap';

import {userActions, validationActions} from '../../../../actions';
import {
  validations,
  Form,
  Input,
  Button as CoreuiButton
} from '../../../../helpers';

class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
        agreement: false
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.updateTitle('Register page');
  }

  componentWillUnmount() {
    this.props.updateTitle(this.props.title);
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
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
    this.removeApiError(name);
  }

  handleSubmit(event) {
    event.preventDefault();

    this.form.validateAll();
    const {user} = this.state;

    if (1) {
        this.props.register(user);
    }
  }

  render() {
    const {registering} = this.props;
    const {user} = this.state;

    return (
      <div className="register-section">
        <Row className="justify-content-center">
          <Col md="6">
            <Card className="mx-4">
              <CardBody className="p-4">
                <Form name="form"
                      noValidate
                      ref={c => {
                        this.form = c
                      }}
                      onSubmit={this.handleSubmit}>
                  <h1>Register</h1>

                  <p className="text-muted">Create your account</p>

                  <div className="mb-3">
                    <Input type="text"
                           name="username" id="username"
                           placeholder="Username"
                           autoComplete="username"
                           label="Username"
                           icon="icon-user"
                           value={user.username}
                           onChange={this.handleChange}
                           apierror={this.props.validation.username}
                           validations={[validations.required, validations.apiError]}/>
                  </div>
                  <div className="mb-3">
                    <Input type="text"
                           name="email" id="email"
                           placeholder="Email"
                           autoComplete="email"
                           label="Email"
                           grouptext="@"
                           value={user.email}
                           onChange={this.handleChange}
                           apierror={this.props.validation.email}
                           validations={[validations.required, validations.email, validations.apiError]}/>
                  </div>
                  <div className="mb-3">
                    <Input type="password"
                           name="password" id="password"
                           placeholder="Password"
                           autoComplete="Password"
                           label="Password"
                           icon="icon-lock"
                           minLength="6"
                           maxLength="32"
                           match="passwordConfirm"
                           value={user.password}
                           onChange={this.handleChange}
                           apierror={this.props.validation.password}
                           validations={[validations.required, validations.lt, validations.gt, validations.password, validations.match]}/>
                  </div>
                  <div className="mb-4">
                    <Input type="password"
                           name="passwordConfirm" id="passwordConfirm"
                           placeholder="Confirm password"
                           autoComplete="Confirm password"
                           label="Confirm password"
                           icon="icon-lock"
                           value={user.passwordConfirm}
                           onChange={this.handleChange}
                           validations={[validations.required, validations.password]}/>
                  </div>
                  <Row>
                    <Col xs="6">
                      <div className="text-center loading-btn-container">
                        <CoreuiButton color="success" block>Create Account</CoreuiButton>
                        {
                          !!registering &&
                          <img className="loading-img"
                               src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
                        }
                      </div>
                    </Col>
                    <Col xs="6">
                      <div className="text-center">
                        <Link to="/login" className="btn">Already registered ?</Link>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter className="p-4">
                <Row>
                  <Col xs="12" sm="6">
                    <Button className="btn-facebook" block><span>facebook</span></Button>
                  </Col>
                  <Col xs="12" sm="6">
                    <Button className="btn-twitter" block><span>twitter</span></Button>
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {registering} = state.registration;
  const {title, validation} = state;

    console.log('title:', title)

  return {
    title,
    registering,
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
    register: (user) => {
      dispatch(userActions.register(user));
  }
};
}

const connectedRegister = connect(mapStateToProps, mapDispatchToProps)(Register);
export {connectedRegister as Register};
