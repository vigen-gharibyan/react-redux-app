import React from 'react';
import {form, control, button} from 'react-validation';
import {
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button,
  FormGroup,
  FormText,
  FormFeedback,
} from 'reactstrap';
import {Editor} from '@tinymce/tinymce-react';

import {validations} from '../validations';
import {config} from '../../config';

import './styles.css';

// Define own Form component
const CustomForm = ({getValues, validate, validateAll, showError, hideError, children, label, ...props}) => (
  // destruct non-valid props
  <form {...props}>{children}</form>
);

// Define own Input component
const CustomInput = ({error, isChanged, isUsed, ...props}) => {
  const hasError = isChanged && isUsed && !!error;

  return (
    <FormGroup className={hasError ? 'has-error' : ''}>
      <InputGroup>
        {
          (!!props.icon || !!props.grouptext) &&
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              { !!props.icon && <i className={props.icon}></i> }
              { !!props.grouptext && props.grouptext }
            </InputGroupText>
          </InputGroupAddon>
        }
        <Input invalid={!!hasError} {...props}/>
      </InputGroup>
      <FormFeedback invalid={(!!hasError).toString()}>{error}</FormFeedback>
    </FormGroup>
  );
};

// Define own File component
const CustomFile = ({error, isChanged, isUsed, ...props}) => {
  return (
    <CustomInput type="file" {...props}/>
  );
};

// Define own Textarea component
const CustomTextarea = ({error, isChanged, isUsed, ...props}) => {
  const otherProps = {error, isChanged, isUsed};

  return (
    <CustomInput type="textarea" {...props} {...otherProps}/>
  )
};

const CustomEditor = ({error, isChanged, isUsed, ...props}) => {
  const hasError = isChanged && isUsed && !!error;
  const otherProps = {error, isChanged, isUsed};

  console.log('props:', props)

  return (
    <FormGroup className={hasError ? 'has-error' : ''}>
      <Editor
        initialValue={props.value}
        apiKey={config.tinymceApiKey}
        init={{
          plugins: 'link image code',
          toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
        }}
        {...otherProps}
      />
      <FormFeedback invalid={(!!hasError).toString()}>{error}</FormFeedback>
    </FormGroup>
  )
};

// Define own Select component
const CustomSelect = ({error, isChanged, isUsed, ...props}) => {
  const hasError = isChanged && isUsed && !!error;

  return (
    <FormGroup className={hasError ? 'has-error' : ''}>
      <InputGroup>
        <Input type="select" invalid={!!hasError} {...props}>
          {props.children}
        </Input>
      </InputGroup>
      <FormFeedback invalid={(!!hasError).toString()}>{error}</FormFeedback>
    </FormGroup>
  )
};

// Define own Checkbox component
const CustomCheckbox = ({error, isChanged, isUsed, ...props}) => {
  const hasError = isChanged && isUsed && !!error;
  const {children} = {...props};
  delete props.children;

  return (
    <div className={hasError ? 'has-error' : ''}>
      <div className="checkbox">
        <label><input type="checkbox" {...props}/>{ children }</label>
      </div>
      {
        hasError &&
        <FormText className="help-block">{error}</FormText>
      }
    </div>
  )
};

// Define own Button component
const CustomButton = ({hasErrors, ...props}) => {
  return (
    <Button {...props} disabled={hasErrors}/>
  );
};

const LoadingImg = (props) => {
  const {loading} = props;

  return (
    !!loading &&
    <img className="loading-img"
         src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
  );
}

// Now call HOCs on components
const CoreuiForm = form(CustomForm);
const CoreuiInput = control(CustomInput);
const CoreuiFile = control(CustomFile);
const CoreuiTextarea = control(CustomTextarea);
const CoreuiEditor = control(CustomEditor);
const CoreuiSelect = control(CustomSelect);
const CoreuiCheckbox = control(CustomCheckbox);
const CoreuiButton = button(CustomButton);

export {
  validations,
  CoreuiForm as Form,
  CoreuiInput as Input,
  CoreuiFile as File,
  CoreuiTextarea as Textarea,
  CoreuiEditor as Editor,
  CoreuiSelect as Select,
  CoreuiCheckbox as Checkbox,
  CoreuiButton as Button,
  LoadingImg
};
