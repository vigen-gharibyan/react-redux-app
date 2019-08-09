import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  FormGroup,
  Label,
  Row,
} from 'reactstrap';

import {userActions, validationActions} from '../../../actions';
import {validations, Form, File, Button as CoreuiButton, LoadingImg} from '../../../helpers';
import {url, defaultProfileImg} from '../../../helpers';

class EditPhoto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        photo: null
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentWillMount() {
    this.props.clearValidationError();
    this.props.getCurrentUser();
  }

  componentWillReceiveProps(nextProps) {
    const {user} = nextProps;

    if (user) {
      this.setState({user});
    }
  }

  removeApiError(name) {
    this.props.clearValidationError(name);
  }

  handleChange(event) {
    let {name} = event.target;
    this.removeApiError(name);
  }

  handleUpdate(event) {
    event.preventDefault();

    const files = Array.from(event.target.photo.files);
    let formData = new FormData();
    files.forEach((file, i) => {
      formData.append('photo', file);
    });

    this.props.updatePhoto(formData);
  }

  handleRemove() {
    this.props.removePhoto();
  }

  render() {
    const {loading} = this.props;
    const {user} = this.state;

    return (
      <Card>
        <Form name="profile-image-form"
              id="profile-image-form"
              noValidate
              onSubmit={this.handleUpdate}>
          <CardHeader>
            <i className="fa fa-cloud-upload"></i> <strong>Change Profile Image</strong>
          </CardHeader>
          <CardBody>
            <Row>
              <Col sm="3">
                <img src={ url(user.photo) || defaultProfileImg }
                     className="img-avatar"/>
              </Col>
              <Col sm="9">
                <FormGroup>
                  <Label htmlFor="photo">Photo</Label>
                  <File
                    name="photo" id="photo"
                    label="Photo"
                    apierror={this.props.validation.photo}
                    onChange={this.handleChange}
                    validations={[validations.required, validations.apiError]}/>
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
          <CardFooter>
            <CoreuiButton type="submit" size="sm" color="primary">
              <i className="fa fa-cloud-upload"></i> Update
            </CoreuiButton>
            {
              !!user.photo &&
              <Button type="button" onClick={this.handleRemove} size="sm" color="danger">
                <i className="fa fa-remove"></i> Remove
              </Button>
            }
            <LoadingImg loading={loading}/>
          </CardFooter>
        </Form>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  const {
    validation,
    users: {
      updateCurrentPhotoLoading,
      currentUser,
      updatedCurrentPhoto
    }
  } = state;

  return {
    loading: updateCurrentPhotoLoading,
    validation,
    user: currentUser,
    updatedCurrentPhoto
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCurrentUser: () => {
      dispatch(userActions.getCurrent());
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

export default connect(mapStateToProps, mapDispatchToProps)(EditPhoto);
