import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

import {userActions} from '../_actions';
import {validationActions} from '../_actions';
import {validations, Form, Input, Textarea, Button} from '../_helpers';

class RegisterPage extends React.Component {
  
    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
            user: {
                username: '',
                email: '',
                password: '',
                passwordConfirm: ''
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    removeApiError(name) {
      const {dispatch} = this.props;
      dispatch(validationActions.clear(name));
    }

    handleChange(event) {
        const {name, value} = event.target;
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

        this.setState({submitted: true});
        this.form.validateAll();
        const {user} = this.state;
        const {dispatch} = this.props;

        if (1) {
          dispatch(userActions.register(user));
        }

        this.setState({submitted: false});
    }

    render() {
        const {registering, validation} = this.props;
        const {user, submitted} = this.state;

        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Register</h2>
                <Form name="form"
                      noValidate
                      ref={c => {
                          this.form = c
                      }}
                      onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <ControlLabel htmlFor="username">Username</ControlLabel>
                        <Input type="text" className="form-control"
                               name="username" id="username"
                               label="Username"
                               value={user.username}
                               onChange={this.handleChange}
                               apierror={this.props.validation.username}
                               validations={[validations.required, validations.apiError]}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel htmlFor="email">Email</ControlLabel>
                        <Input type="text" className="form-control"
                               name="email" id="email"
                               label="Email"
                               value={user.email}
                               onChange={this.handleChange}
                               apierror={this.props.validation.email}
                               validations={[validations.required, validations.email, validations.apiError]}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel htmlFor="password">Password</ControlLabel>
                        <Input type="password" className="form-control"
                               name="password" id="password"
                               label="Password"
                               minLength="6"
                               maxLength="32"
                               match="passwordConfirm"
                               value={user.password}
                               onChange={this.handleChange}
                               validations={[validations.required, validations.lt, validations.gt, validations.password, validations.match]}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel htmlFor="passwordConfirm">Confirm Password</ControlLabel>
                        <Input type="password" className="form-control"
                               name="passwordConfirm" id="passwordConfirm"
                               label="Confirm Password"
                               value={user.passwordConfirm}
                               onChange={this.handleChange}
                               validations={[validations.required, validations.password]}/>
                    </FormGroup>

                    <FormGroup>
                        <Button className="btn btn-primary">Register</Button>
                        {
                          registering &&
                          <img
                            src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
                        }
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {registering} = state.registration;
    const {validation} = state;
    return {
        registering,
        validation
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export {connectedRegisterPage as RegisterPage};
