import React, {Component} from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Row,
  Table
} from 'reactstrap';

import PostsTable from './PostsTable';

class Posts extends Component {

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
                <i className="fa fa-users"></i> <strong>Posts</strong>
              </CardHeader>
              <CardBody>
                <PostsTable getLocation={this.getLocation}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Posts;
