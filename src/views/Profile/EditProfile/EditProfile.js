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

import {redirect} from '../../../helpers';
import {userActions, validationActions} from '../../../actions';
import {validations, Form, Input, Button as CoreuiButton, LoadingImg} from '../../../helpers';
import EditPhoto from '../EditPhoto';

class EditProfile extends Component {

  constructor(props) {
    super(props);

    const user = {
      username: '',
      email: '',
    }

    this.state = {
      initialData: user,
      user,
    };

    this.handleChange = this.handleChange.bind(this);
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
      const initialData = {...user};
      this.setState({user, initialData});
    }

    if (updatedCurrent) {
      redirect('/profile');
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
    const {initialData} = this.state;
    this.setState({user: {...initialData}});
  }

  render() {
    const {loading} = this.props;
    const {user} = this.state;

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
                  <LoadingImg loading={loading}/>
                </CardFooter>
              </Form>
            </Card>
          </Col>
          <Col sm="12" md="8" xl="6">
            <EditPhoto/>
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
      updateCurrentLoading,
      currentUser,
      updatedCurrent,
    }
  } = state;

  return {
    loading: updateCurrentLoading,
    validation,
    user: currentUser,
    updatedCurrent,
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
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
