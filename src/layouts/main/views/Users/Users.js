import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Badge, Card, CardBody, CardHeader, Col, Row} from 'reactstrap';

import {history} from '../../../../helpers';
import UsersTable from './UsersTable';

const queryString = require('query-string');

//todo: remove
function UserRow(props) {
  const {index, user} = props;
  const userLink = `/users/${user.id}`;

  const STATUS_DELETED = 0;
  const STATUS_INACTIVE = 1;
  const STATUS_ACTIVE = 10;

  const getBadge = (status) => {
    return (
      status === STATUS_ACTIVE ? 'success' :
        status === STATUS_INACTIVE ? 'secondary' :
          status === 'Pending' ? 'warning' :
            status === 'Banned' ? 'danger' :
              status === STATUS_DELETED ? 'danger' :
                'primary'
    )
  }

  return (
    <tr key={user.id.toString()}>
      <th scope="row">
        {index + 1}
      </th>
      <td>
        <Link to={userLink}>
          <img src={ user.photo || defaultProfileImg }
               className="img-avatar"/>
        </Link>
      </td>
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

    const search = props.location.search;
    const params = queryString.parse(search);

    this.state = {
      params
    };
  }

  redirectTo(params) {
    let search = queryString.stringify(params);
    if(search) {
      search = `?${search}`;
    }

    history.push(`/users${search}`);
  }

  render() {
    const {params} = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-users"></i> <strong>Users</strong>
              </CardHeader>
              <CardBody>
                <UsersTable params={params} redirectTo={this.redirectTo}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Users;
