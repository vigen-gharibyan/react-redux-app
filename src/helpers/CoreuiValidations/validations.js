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
  FormFeedback
} from 'reactstrap';

import {validations} from '../validations';

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
      <FormFeedback invalid={hasError}>{error}</FormFeedback>
    </FormGroup>
  );
};

// Define own File component
const CustomFile = ({error, isChanged, isUsed, ...props}) => {
  const hasError = isChanged && isUsed && !!error;

  return (
    <FormGroup className={hasError ? 'has-error' : ''}>
      <InputGroup>
        <Input type="file" {...props}/>
      </InputGroup>
      <FormFeedback invalid={hasError}>{error}</FormFeedback>
    </FormGroup>
  );
};

// Define own Textarea component
const CustomTextarea = ({error, isChanged, isUsed, ...props}) => {
  const hasError = !!(isChanged && isUsed && !!error);

  return (
    <div className={(isChanged && isUsed && !!error) ? 'has-error' : ''}>
      <textarea invalid={hasError} {...props}>{ props.value }</textarea>
      <FormFeedback>{error}</FormFeedback>
    </div>
  )
};

// Define own Select component
const CustomSelect = ({error, isChanged, isUsed, ...props}) => {
  const hasError = isChanged && isUsed && !!error;

  return (
    <FormGroup className={hasError ? 'has-error' : ''}>
      <InputGroup>
        <Input type="select" invalid={hasError} {...props}>
          {props.children}
        </Input>
      </InputGroup>
      <FormFeedback>{error}</FormFeedback>
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

// Now call HOCs on components
const CoreuiForm = form(CustomForm);
const CoreuiInput = control(CustomInput);
const CoreuiFile = control(CustomFile);
const CoreuiTextarea = control(CustomTextarea);
const CoreuiSelect = control(CustomSelect);
const CoreuiCheckbox = control(CustomCheckbox);
const CoreuiButton = button(CustomButton);

export {
  validations,
  CoreuiForm as Form,
  CoreuiInput as Input,
  CoreuiFile as File,
  CoreuiTextarea as Textarea,
  CoreuiSelect as Select,
  CoreuiCheckbox as Checkbox,
  CoreuiButton as Button
};
