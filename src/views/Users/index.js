import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Col, Row} from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import UsersTable from './UsersTable';

class Users extends Component {

  constructor(props) {
    super(props);

    this.getLocation = this.getLocation.bind(this);
  }

  getLocation() {
    return this.props.location;
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-users"></i> <strong><FormattedMessage id="Users"/></strong>
              </CardHeader>
              <CardBody>
                <UsersTable getLocation={this.getLocation}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Users;
