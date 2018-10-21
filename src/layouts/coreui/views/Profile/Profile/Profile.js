import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
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

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: '',
        email: '',
        role: {
          name: ''
        },
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
        <Col sm="12" md="8" xl="6">
          <Card>
            <CardHeader>
              Profile
            </CardHeader>
            <CardBody>
              <dl className="row">

                <dt className="col-sm-3">Username:</dt>
                <dd className="col-sm-9">{user.username}</dd>

                <dt className="col-sm-3">Email:</dt>
                <dd className="col-sm-9">{user.email}</dd>

                <dt className="col-sm-3">Role:</dt>
                <dd className="col-sm-9">{user.role.name}</dd>

                <dt className="col-sm-3">Registered:</dt>
                <dd className="col-sm-9">{user.created_at}</dd>

                <dd className="col-sm-9">
                  <Link to="/profile/edit">
                    <Button size="sm" color="primary">
                      <i className="fa fa-edit"></i> Edit
                    </Button>
                  </Link>
                </dd>
                <dd className="col-sm-9">
                  <Link to="/profile/change-password">
                    <Button size="sm" color="primary">
                      <i className="fa fa-unlock-alt"></i> Change Password
                    </Button>
                  </Link>
                </dd>
              </dl>
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {users, validation} = state;
  const {user} = users;

  return {
    validation,
    user
  };
}

export default connect(mapStateToProps)(Profile);
