import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row
} from 'reactstrap';

import {userActions} from '../../../../../actions';

//todo
const defaultProfileImg = '/assets/img/users/default-profile.png';
import {date} from '../../../../../helpers';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: '',
        email: '',
        role: undefined,
        created_at: ''
      }
    };
  }

  componentDidMount() {
    this.props.dispatch(userActions.getCurrent());
  }

  componentWillReceiveProps(nextProps) {
    const {user} = nextProps;
    if (user) {
      this.setState({user});
    }
  }

  render() {
    const {user} = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="12" md="8" xl="6">
            <Card>
              <CardHeader>
                <i className="fa fa-user"></i> <strong>My Profile</strong>
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
                  <Col sm="10">
                    <dl className="row">
                      <dt className="col-sm-3">Username:</dt>
                      <dd className="col-sm-9">{user.username}</dd>

                      <dt className="col-sm-3">Email:</dt>
                      <dd className="col-sm-9">{user.email}</dd>

                      <dt className="col-sm-3">Role:</dt>
                      <dd className="col-sm-9">{!!user.roles && user.roles[user.role]}</dd>

                      <dt className="col-sm-3">Registered:</dt>
                      <dd className="col-sm-9">{date.format(user.created_at)}</dd>
                    </dl>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Link to="/profile/edit">
                  <Button size="sm" color="primary">
                    <i className="fa fa-edit"></i> Edit
                  </Button>
                </Link>
                <Link to="/profile/change-password">
                  <Button size="sm" color="primary">
                    <i className="fa fa-unlock-alt"></i> Change Password
                  </Button>
                </Link>
              </CardFooter>
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
      currentUser
    }
  } = state;

  return {
    validation,
    user: currentUser
  };
}

export default connect(mapStateToProps)(Profile);
