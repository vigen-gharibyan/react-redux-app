import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import {userActions} from '../../../../actions';

import usersData from './UsersData'

class User extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      user: {
        username: '',
        email: '',
        role: {
          name: ''
        },
        status: {
          name: ''
        },
        created_at: ''
      }
    }
  }

  componentDidMount() {
    const {id} = this.state;
    this.props.dispatch(userActions.get(id));
  }

  componentWillReceiveProps(nextProps) {
    const {user} = nextProps;

    console.log('nextProps:', nextProps)

    if (user) {
      this.setState({user});
    }
  }

  render() {
    const {user} = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>User details</strong>
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
                </dl>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {users} = state;
  const {user} = users;

  return {
    user
  };
}

export default connect(mapStateToProps)(User);
