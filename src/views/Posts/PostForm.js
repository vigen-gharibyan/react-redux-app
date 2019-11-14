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
  Editor,
  Button as CoreuiButton,
  LoadingImg,
} from '../../helpers';
import {url} from '../../helpers';

class PostForm extends Component {

  constructor(props) {
    super(props);

    const post = {
      title: '',
      content: '',
      enabled: '',
    };

    const statuses = [
      {
        id: 0,
        name: 'Disabled',
      },
      {
        id: 1,
        name: 'Enabled',
      },
    ];

    this.state = {
      post,
      statuses,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.clearValidationError();
  }

  componentWillReceiveProps(nextProps) {
    const {data, initialData} = nextProps;

    if (data) {
      this.setState({post: data});
    }
  }

  removeApiError(name) {
    this.props.clearValidationError(name);
  }

  handleChange(event) {
    let {name, value} = event.target;
    const {post} = this.state;

    post[name] = value;
    this.setState({post});
    this.removeApiError(name);
  }

  handleEditorChange(e) {
    const value = e.target.getContent();
    let {post} = this.state;
    post.content = value;
    this.setState({post});
    this.removeApiError('content');
  }

  handleSubmit(event) {
    event.preventDefault();

    this.form.validateAll();
    this.props.save();
  }

  render() {
    const {loading} = this.props;
    const {post, statuses} = this.state;

    return (
      <Card>
        <Form name="form"
              noValidate
              ref={c => {
                this.form = c
              }}
              onSubmit={this.handleSubmit}>
          <CardHeader>
            <i className="fa fa-newspaper-o"></i> <strong>{this.props.formTitle}</strong>
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
                  <Editor name="content" id="content"
                          placeholder="Content"
                          autoComplete="content"
                          label="Content"
                          value={post.content}
                          handleChange={this.handleEditorChange}
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
    )
  }
}

function mapStateToProps(state) {
  const {
    validation,
    posts: {
      updateLoading,
      updated,
    }
  } = state;

  return {
    loading: updateLoading,
    validation,
    updated,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clearValidationError: (name) => {
      dispatch(validationActions.clear(name));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
