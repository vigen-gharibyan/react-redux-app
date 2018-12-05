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

//todo
const defaultProfileImg = '/assets/img/users/default-profile.png';

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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleChangeFile = this.handleChangeFile.bind(this);
    this.handleUpdatePhoto = this.handleUpdatePhoto.bind(this);
    this.handleRemovePhoto = this.handleRemovePhoto.bind(this);
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
    let {name} = event.target;
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

  handleUpdatePhoto(event) {
    event.preventDefault();

    const files = Array.from(event.target.photo.files);
    let formData = new FormData();
    files.forEach((file, i) => {
      formData.append('photo', file);
    });

    this.props.updatePhoto(formData);
  }

  handleRemovePhoto() {
    console.log('handleRemovePhoto')

    this.props.removePhoto();
  }

  render() {
    const {user, photo} = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="12" md="8" xl="6">
            <Card>
              <Form name="profile-form"
                    noValidate
                    ref={c => {
                      this.form = c
                    }}
                    onSubmit={this.handleSubmit}>
                <CardHeader>
                  <i className="fa fa-user"></i> <strong>Edit Profile</strong>
                </CardHeader>
                <CardBody>
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
              <Form name="profile-image-form"
                    id="profile-image-form"
                    noValidate
                    ref={c => {
                      this.formUpload = c
                    }}
                    onSubmit={this.handleUpdatePhoto}>
                <CardHeader>
                  <i className="fa fa-cloud-upload"></i> <strong>Change Profile Image</strong>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col sm="3">
                      <img src={ user.photo || defaultProfileImg }
                           className="img-avatar"/>
                    </Col>
                    <Col sm="9">
                      <FormGroup>
                        <Label htmlFor="photo">Photo</Label>
                        <File
                          name="photo" id="photo"
                          label="Photo"
                          apierror={this.props.validation.photo}
                          onChange={this.handleChangeFile}
                          validations={[validations.required, validations.apiError]}/>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <CoreuiButton type="submit" size="sm" color="primary">
                    <i className="fa fa-cloud-upload"></i> Update
                  </CoreuiButton>
                  <Button type="button" onClick={this.handleRemovePhoto} size="sm" color="danger">
                    <i className="fa fa-remove"></i> Remove
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    validation,
    users: {
      currentUser,
      updatedCurrent,
      updatedCurrentPhoto
    }
  } = state;

  return {
    validation,
    user: currentUser,
    updatedCurrent,
    updatedCurrentPhoto
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
    updatePhoto: (formData) => {
      dispatch(userActions.updateCurrentPhoto(formData));
    },
    removePhoto: (formData) => {
      dispatch(userActions.removeCurrentPhoto(formData));
    },
    clearValidationError: (name) => {
      dispatch(validationActions.clear(name));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
