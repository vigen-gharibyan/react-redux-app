import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table
} from 'reactstrap';

import {userActions} from '../../../../actions';

import usersData from './UsersData'

class Edit extends Component {

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
                  <dd className="col-sm-9">
                    Edit User
                  </dd>
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

const UserEdit = connect(mapStateToProps)(Edit);
export default UserEdit;
