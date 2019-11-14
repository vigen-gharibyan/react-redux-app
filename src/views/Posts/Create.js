import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Col} from 'reactstrap';

import {Link, redirect} from "../../helpers/Intl";
import {postActions, validationActions} from '../../actions';
import PostForm from './PostForm';

class Create extends Component {

  constructor(props) {
    super(props);

    const post = {
      title: '',
      content: '',
      enabled: '',
    };

    this.state = {
      initialData: post,
      post,
    };

    this.save = this.save.bind(this);
  }

  componentWillMount() {
    this.props.clearValidationError();
  }

  componentWillReceiveProps(nextProps) {
    const {created} = nextProps;

    if (created) {
      redirect(`/posts`);
    }
  }

  removeApiError(name) {
    this.props.clearValidationError(name);
  }

  save() {
    const {post} = this.state;

    const data = {
      title: post.title,
      content: post.content,
      enabled: post.enabled,
    };

    this.props.createPost(data);
  }

  render() {
    const {loading} = this.props;
    const {post} = this.state;

    return (
      <div className="animated fadeIn">
        <Col sm="12">
          <PostForm
            id={this.state.id}
            data={post}
            save={this.save}
            formTitle="Add Post"
          />
        </Col>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {
    validation,
    posts: {
      createLoading,
      created,
    }
  } = state;

  return {
    loading: createLoading,
    validation,
    created,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createPost: (post) => {
      dispatch(postActions.create(post));
    },
    clearValidationError: (name) => {
      dispatch(validationActions.clear(name));
    }
  }
}

const PostCreate = connect(mapStateToProps, mapDispatchToProps)(Create);
export default PostCreate;
