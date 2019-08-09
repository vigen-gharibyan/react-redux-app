import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
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

import {Link} from "../../helpers";
import {postActions} from '../../actions';
import {date} from '../../helpers';

const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

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

  componentWillReceiveProps(nextProps) {
    const {post} = nextProps;

    if (post) {
      this.setState({post});
    }
  }

  escapeHtml(text) {
    if(text) {
      return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    return '';
  }

  render() {
    const {id, post} = this.state;

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
                      <dt className="col-sm-12">{post.title}</dt>
                      <dd className="col-sm-12">{this.escapeHtml(post.content)}</dd>
                      <dd className="col-sm-9">Created: {date.format(post.created_at)}</dd>
                    </dl>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Link to={`/posts/${id}/edit`}>
                  <Button size="sm" color="primary">
                    <i className="fa fa-edit"></i> <FormattedMessage id="Edit"></FormattedMessage>
                  </Button>
                </Link>
              </CardFooter>
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
