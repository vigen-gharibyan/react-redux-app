import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Col, Row} from 'reactstrap';

import {history} from '../../../../helpers';
import UsersTable from './UsersTable';

const queryString = require('query-string');

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
