import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import {userActions} from '../../../../actions';
import usersData from './UsersData'

function UserRow(props) {
  const {index, user} = props;
  const userLink = `/users/${user.id}`;

  const getBadge = (status) => {
    return status === 'Active' ? 'success' :
      status === 'Inactive' ? 'secondary' :
        status === 'Pending' ? 'warning' :
          status === 'Banned' ? 'danger' :
            'primary'
  }

  return (
    <tr key={user.id.toString()}>
      <th scope="row">
        {index + 1}
      </th>
      <td>
        <Link to={userLink}>{user.username}</Link>
      </td>
      <td>
        <Link to={userLink}>{user.email}</Link>
      </td>
      <td>
        {user.created_at}
      </td>
      <td>
        {user.role.name}
      </td>
      <td>
        <Badge href={userLink} color={getBadge(user.status.id)}>{user.status.name}</Badge>
      </td>
    </tr>
  )
}

class Users extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: []
    };
  }

  componentDidMount() {
    this.props.dispatch(userActions.getAll());
  }

  componentWillReceiveProps(nextProps) {
    const {items} = nextProps;
    if (items) {
      this.setState({items});
    }
  }

  render() {

    const {items} = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Users
              </CardHeader>
              <CardBody>
                {
                  (items.length > 0) ?
                    <Table responsive hover>
                      <thead>
                        <tr>
                          <th scope="col"></th>
                          <th scope="col">Username</th>
                          <th scope="col">Email</th>
                          <th scope="col">Registered</th>
                          <th scope="col">Role</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                      {
                        items.map((user, index) =>
                          <UserRow key={index} index={index} user={user}/>
                        )
                      }
                      </tbody>
                    </Table>
                      :
                    <h4>There is no data to show</h4>
                }
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
  const {items} = users;

  return {
    items
  };
}

export default connect(mapStateToProps)(Users);
