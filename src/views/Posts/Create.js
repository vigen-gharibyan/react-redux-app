import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  FormGroup,
  Label,
  Row,
  Table,
} from 'reactstrap';

import {Link, redirect} from "../../helpers/Intl";
import {postActions, validationActions} from '../../actions';
import {
  validations,
  Form,
  Input,
  Textarea,
  Select,
  Button as CoreuiButton,
  LoadingImg,
} from '../../helpers';
import {url} from '../../helpers';

class Create extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isDirty: false,
      initialData: null,
      post: {
        title: '',
        content: '',
        enabled: '',
      },
      statuses: [
        {
          id: 0,
          name: 'Disabled',
        }, {
          id: 1,
          name: 'Enabled',
        },
      ],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.clearValidationError();
  }

  componentWillReceiveProps(nextProps) {
    const {post, created} = nextProps;

    if (post) {
      this.setState({post});
    }

    if (created) {
      redirect(`/posts`);
    }
  }

  removeApiError(name) {
    this.props.clearValidationError(name);
  }

  handleChange(event) {
    let {name, value} = event.target;

    if (event.target.type === 'checkbox') {
      value = event.target.checked;
    }

    const post = {...this.state.post};
    if (!this.state.isDirty && post[name] !== value) {
      const initialData = {...post};
      this.setState({
        initialData,
        isDirty: true
      });
    }

    post[name] = value;
    this.setState({post});
    this.removeApiError(name);
  }

  handleSubmit(event) {
    event.preventDefault();

    const {id} = this.state;
    this.form.validateAll();

    //todo
    let {post} = this.state;
    const data = {
      title: post.title,
      content: post.content,
      enabled: post.enabled,
    };

    if (1) {
      this.props.createPost(data);
    }
  }

  render() {
    const {loading} = this.props;
    const {post, statuses} = this.state;

    return (
      <div className="animated fadeIn">
        <Col sm="12">
          <Card>
            <Form name="form"
                  noValidate
                  ref={c => {
                    this.form = c
                  }}
                  onSubmit={this.handleSubmit}>
              <CardHeader>
                <i className="fa fa-newspaper-o"></i> <strong>Add Post</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col sm="6">
                    <FormGroup>
                      <Label htmlFor="title">Title</Label>
                      <Input type="text"
                             name="title" id="title"
                             placeholder="Title"
                             autoComplete="title"
                             label="Title"
                             value={post.title}
                             onChange={this.handleChange}
                             apierror={this.props.validation.title}
                             validations={[validations.required, validations.apiError]}/>
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="content">Content</Label>
                      <Textarea name="content" id="content"
                                placeholder="Content"
                                autoComplete="content"
                                label="Content"
                                value={post.content}
                                onChange={this.handleChange}
                                apierror={this.props.validation.content}
                                validations={[validations.required, validations.apiError]}/>
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="status">Status</Label>
                      <Select
                        name="enabled" id="enabled"
                        label="Status"
                        value={post.enabled}
                        onChange={this.handleChange}
                        apierror={this.props.validation.enabled}
                        validations={[validations.required, validations.apiError]}>
                        <option value="">Select</option>
                        {
                          !!statuses &&
                          statuses.map((item, k) => (
                            <option key={k} value={item.id}>{item.name}</option>
                          ))
                        }
                      </Select>
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <CoreuiButton type="submit" size="sm" color="primary">
                  <i className="fa fa-dot-circle-o"></i> Save
                </CoreuiButton>
                <LoadingImg loading={loading}/>
              </CardFooter>
            </Form>
          </Card>
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
      post,
      created,
    }
  } = state;

  return {
    loading: createLoading,
    validation,
    post,
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
