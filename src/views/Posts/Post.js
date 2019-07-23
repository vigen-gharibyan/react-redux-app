import React, {Component} from 'react';
import {connect} from 'react-redux';
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

import {postActions} from '../../actions';
import {date} from '../../helpers';

class Post extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      post: {
        title: null,
        content: null,
        created_at: null,
      },
    };
  }

  componentDidMount() {
    const {id} = this.state;
    this.props.dispatch(postActions.get(id));
  }

  render() {
    const {post} = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-newspaper-o"></i> <strong>Post</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col sm="10">
                    <dl className="row">
                      <dt className="col-sm-3">Title:</dt>
                      <dd className="col-sm-9">{post.title}</dd>

                      <dt className="col-sm-3">Content:</dt>
                      <dd className="col-sm-9">{post.content}</dd>

                      <dt className="col-sm-3">Created:</dt>
                      <dd className="col-sm-9">{date.format(post.created_at)}</dd>
                    </dl>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {
    posts: {post}
  } = state;

  return {post};
}

export default connect(mapStateToProps)(Post);
