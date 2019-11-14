import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

class CustomDropzone extends Component {

  render() {
    return (
      <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
          {({getRootProps, getInputProps}) => (
            <section>
              <div className="dropzone" {...getRootProps()}>
                <input {...getInputProps()} />
                <div>Drop files here to upload</div>
              </div>
            </section>
          )}
        </Dropzone>
    )
  };
}

export default CustomDropzone;
