import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

import {userActions, validationActions} from '../../actions';
import {validations, Form, Input, Button} from '../../helpers';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    removeApiError(name) {
      const {dispatch} = this.props;
      dispatch(validationActions.clear());
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
        this.removeApiError(name);
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({submitted: true});
        this.form.validateAll();
        const {username, password} = this.state;
        const {dispatch} = this.props;
        if (1) {
            dispatch(userActions.login(username, password));
        }
    }

    render() {
        const {loggingIn} = this.props;
        const {username, password, submitted} = this.state;

        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Login</h2>
                <Form name="form"
                      noValidate
                      ref={c => {
                          this.form = c
                      }}
                      onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <ControlLabel htmlFor="username">Username</ControlLabel>
                        <Input type="text" className="form-control"
                               name="username"
                               id="username"
                               label="Username"
                               value={username}
                               onChange={this.handleChange}
                               apierror={this.props.validation.username}
                               validations={[validations.required, validations.apiError]}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel htmlFor="password">Password</ControlLabel>
                        <Input type="password" className="form-control"
                               name="password"
                               id="password"
                               label="Password"
                               value={password}
                               minLength="6"
                               maxLength="32"
                               onChange={this.handleChange}
                               apierror={this.props.validation.password}
                               validations={[validations.required, validations.lt, validations.gt, validations.apiError]}/>
                    </FormGroup>
                    <FormGroup>
                        <Button className="btn btn-primary">Login</Button>
                        {
                            loggingIn &&
                            <img
                                src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
                        }
                        <Link to="/register" className="btn btn-link">Register</Link>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {loggingIn} = state.authentication;
    const {validation} = state;
    return {
        loggingIn,
        validation
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export {connectedLoginPage as LoginPage};