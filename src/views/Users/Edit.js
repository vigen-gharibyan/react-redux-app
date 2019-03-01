import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  FormGroup,
  Label,
  Row,
  Table
} from 'reactstrap';

import {Link, redirect} from "../../helpers/Intl";
import {userActions, validationActions} from '../../actions';
import {
  validations,
  Form,
  Input,
  Select,
  Button as CoreuiButton,
  LoadingImg
} from '../../helpers';

//todo
const defaultProfileImg = '/assets/img/users/default-profile.png';

class Edit extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isDirty: false,
      id: this.props.match.params.id,
      initialData: null,
      user: {
        username: '',
        role: undefined,
        status: undefined
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentWillMount() {
    const {id} = this.state;
    this.props.clearValidationError();
    this.props.getUser(id);
  }

  componentWillReceiveProps(nextProps) {
    const {user, updated} = nextProps;
    const {id} = this.state;

    if (user) {
      this.setState({user});
    }

    if (updated) {
      redirect(`/users/${id}`);
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

    const user = {...this.state.user};
    if (!this.state.isDirty && user[name] !== value) {
      const initialData = {...user};
      this.setState({
        initialData,
        isDirty: true
      });
    }

    user[name] = value;
    this.setState({user});
    this.removeApiError(name);
  }

  handleSubmit(event) {
    event.preventDefault();

    const {id} = this.state;
    this.form.validateAll();

    //todo
    let {user} = this.state;
    const data = {
      role: user.role,
      status: user.status
    };

    if (1) {
      this.props.updateUser(id, data);
    }
  }

  handleReset(event) {
    const {isDirty, initialData} = this.state;
    if (isDirty) {
      this.setState({user: initialData});
    }
  }

  render() {
    const {loading} = this.props;
    const {user, isDirty} = this.state;
    const {roles, statuses} = user;

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
                <i className="fa fa-user"></i> <strong>Edit: {user.username}</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col sm="4">
                    <div className="profile-img-container">
                      <img src={ user.photo || defaultProfileImg }
                           className=""/>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <FormGroup>
                      <Label htmlFor="role">Role</Label>
                      <Select
                        name="role" id="role"
                        label="Role"
                        value={user.role}
                        onChange={this.handleChange}
                        apierror={this.props.validation.role}
                        validations={[validations.required, validations.apiError]}>
                        <option value="">Select</option>
                        {
                          !!roles &&
                          Object.keys(roles).map((index, k) => (
                            <option key={k} value={index}>{roles[index]}</option>
                          ))
                        }
                      </Select>
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="status">Status</Label>
                      <Select
                        name="status" id="status"
                        label="Status"
                        value={user.status}
                        onChange={this.handleChange}
                        apierror={this.props.validation.status}
                        validations={[validations.required, validations.apiError]}>
                        <option value="">Select</option>
                        {
                          !!statuses &&
                          Object.keys(statuses).map((index, k) => (
                            <option key={k} value={index}>{statuses[index]}</option>
                          ))
                        }
                      </Select>
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <CoreuiButton type="submit" size="sm" color="primary">
                  <i className="fa fa-dot-circle-o"></i> Save {isDirty}
                </CoreuiButton>
                <Button onClick={this.handleReset} type="button" size="sm" color="danger">
                  <i className="fa fa-ban"></i> Reset
                </Button>
                <LoadingImg loading={loading}/>
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {
    validation,
    users: {
      updateByIdloading,
      user,
      updated
    }
  } = state;

  return {
    loading: updateByIdloading,
    validation,
    user,
    updated
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUser: (id) => {
      dispatch(userActions.get(id));
    },
    updateUser: (id, user) => {
      dispatch(userActions.update(id, user));
    },
    clearValidationError: (name) => {
      dispatch(validationActions.clear(name));
    }
  }
}

const UserEdit = connect(mapStateToProps, mapDispatchToProps)(Edit);
export default UserEdit;
