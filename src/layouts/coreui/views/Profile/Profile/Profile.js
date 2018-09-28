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
        email: ''
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
        <Col xs="12" md="6">
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

                <dd className="col-sm-9">
                  <Link to="/profile/edit">
                    <Button size="sm" color="primary">
                      <i className="fa fa-edit"></i> Edit
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
