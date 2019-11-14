import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Editor} from '@tinymce/tinymce-react';

import {config} from '../../config';

class TinymceEditor extends Component {

  /*
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const editorValue = e.target.getContent();

    console.log('editorValue:', editorValue)
  }
  */

  render() {
    const {value} = this.props;

    return (
      <Editor
        initialValue={value}
        apiKey={config.tinymceApiKey}
        init={{
          plugins: 'link image code',
          toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
        }}
        onChange={this.props.handleChange}
      />
    )
  };
}

export default TinymceEditor;
