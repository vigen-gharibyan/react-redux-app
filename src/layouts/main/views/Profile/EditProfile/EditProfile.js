import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
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
import {validations, Form, Input, File, Button as CoreuiButton} from '../../../../../helpers';

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: '',
        email: ''
      },
      photo: '-'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeFile = this.handleChangeFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentWillMount() {
    this.props.clearValidationError();
    this.props.getCurrentUser();
  }

  componentWillReceiveProps(nextProps) {
    const {user, updatedCurrent} = nextProps;
    if (user) {
      this.setState({user});
    }

    if (updatedCurrent) {
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

  handleChangeFile(event) {
    const files = Array.from(event.target.files);

    const formData = new FormData();
    files.forEach((file, i) => {
      formData.append(i, file)
    });
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
    const {user, photo} = this.state;

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
                <strong>Edit Profile</strong>
              </CardHeader>
              <CardBody>
                <FormGroup>
                  <Label htmlFor="photo">Photo</Label>
                  <File
                    name="photo" id="photo"
                    label="Photo"
                    onChange={this.handleChangeFile}
                    //apierror={this.props.validation.photo}
                    validations={[validations.required, validations.apiError]}/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="username">Username</Label>
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
                  <Label htmlFor="email">Email</Label>
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
                  <i className="fa fa-dot-circle-o"></i> Save
                </CoreuiButton>
                <Button onClick={this.handleReset} type="reset" size="sm" color="danger">
                  <i className="fa fa-ban"></i> Reset
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </Col>
        <Col sm="12" md="8" xl="6">
          <Card>
            <CardHeader>
              <strong>Profile Image</strong>
            </CardHeader>
            <CardBody>

            </CardBody>
            <CardFooter></CardFooter>
          </Card>
        </Col>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {validation, users: {currentUser, updatedCurrent}} = state;

  return {
    validation,
    user: currentUser,
    updatedCurrent
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
