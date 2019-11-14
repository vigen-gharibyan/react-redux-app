import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Col} from 'reactstrap';

import {Link, redirect} from "../../helpers/Intl";
import {postActions, validationActions} from '../../actions';
import PostForm from './PostForm';

class Edit extends Component {

  constructor(props) {
    super(props);

    const {id} = props.match.params;

    const post = {
      title: '',
      content: '',
      enabled: '',
    };

    this.state = {
      id,
      initialData: post,
      post,
    };

    this.save = this.save.bind(this);
  }

  componentWillMount() {
    const {id} = this.state;
    this.props.clearValidationError();
    this.props.getPost(id);
  }

  componentWillReceiveProps(nextProps) {
    const {post, updated} = nextProps;
    const {id} = this.state;

    if (post) {
      const initialData = {...post};
      this.setState({post, initialData});
    }

    if (updated) {
      redirect(`/posts/${id}`);
    }
  }

  save() {
    const {id} = this.state;
    const {post} = this.state;

    const data = {
      title: post.title,
      content: post.content,
      enabled: post.enabled,
    };

    this.props.updatePost(id, data);
  }

  render() {
    const {loading} = this.props;
    const {post, initialData} = this.state;

    return (
      <div className="animated fadeIn">
        <Col sm="12">
          <PostForm
            id={this.state.id}
            data={post}
            initialData={initialData}
            save={this.save}
            formTitle={`Edit: ${initialData.title}`}
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
      updateLoading,
      post,
      updated,
    }
  } = state;

  return {
    loading: updateLoading,
    validation,
    post,
    updated,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPost: (id) => {
      dispatch(postActions.get(id));
    },
    updatePost: (id, post) => {
      dispatch(postActions.update(id, post));
    },
    clearValidationError: (name) => {
      dispatch(validationActions.clear(name));
    }
  }
}

const PostEdit = connect(mapStateToProps, mapDispatchToProps)(Edit);
export default PostEdit;
