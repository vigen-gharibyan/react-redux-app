import React from 'react';
import {form, control, button} from 'react-validation';
import {
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button,
  FormText
} from 'reactstrap';

import {validations} from './validations';

// Define own Form component
const CustomForm = ({getValues, validate, validateAll, showError, hideError, children, label, ...props}) => (
  // destruct non-valid props
  <form {...props}>{children}</form>
);

// Define own Input component
const CustomInput = ({error, isChanged, isUsed, ...props}) => {
  return (
    <div>
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
        <Input {...props}/>
      </InputGroup>
      {
        isChanged && isUsed &&
        <FormText className="help-block">{error}</FormText>
      }
    </div>

  );
};

// Define own Textarea component
const CustomTextarea = ({error, isChanged, isUsed, ...props}) => (
  <div className={(isChanged && isUsed && error) ? 'has-error' : ''}>
    <textarea {...props}>{ props.value }</textarea>
    {
      isChanged && isUsed &&
      <FormText className="help-block">{error}</FormText>
    }
  </div>
);

// Define own Select component
const CustomSelect = ({error, isChanged, isUsed, ...props}) => (
  <div className={(isChanged && isUsed && error) ? 'has-error' : ''}>
    <select {...props}>
      {props.children}
    </select>
    {
      isChanged && isUsed &&
      <FormText className="help-block">{error}</FormText>
    }
  </div>
);

// Define own Checkbox component
const CustomCheckbox = ({error, isChanged, isUsed, ...props}) => {
  const {children} = {...props};
  delete props.children;

  return (
    <div className={(isChanged && isUsed && error) ? 'has-error' : ''}>
      <div className="checkbox">
        <label><input type="checkbox" {...props}/>{ children }</label>
      </div>
      {
        isChanged && isUsed &&
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
const CoreuiTextarea = control(CustomTextarea);
const CoreuiSelect = control(CustomSelect);
const CoreuiCheckbox = control(CustomCheckbox);
const CoreuiButton = button(CustomButton);

export {
  validations,
  CoreuiForm as Form,
  CoreuiInput as Input,
  CoreuiTextarea as Textarea,
  CoreuiSelect as Select,
  CoreuiCheckbox as Checkbox,
  CoreuiButton as Button
};
