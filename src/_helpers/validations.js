import React from 'react';
import {form, control, button} from 'react-validation';
import validator from 'validator';

// Define own Form component
const CustomForm = ({getValues, validate, validateAll, showError, hideError, children, ...props}) => (
    // destruct non-valid props
    <form {...props}>{children}</form>
);

// Define own Input component
const CustomInput = ({error, isChanged, isUsed, ...props}) => (
    <div className={isChanged && isUsed && error && 'has-error'}>
        <input {...props} />
        {
            isChanged && isUsed && 
            <div className="help-block">{error}</div>
        }
    </div>
);

// Define own Button component
const CustomButton = ({hasErrors, ...props}) => {
    return (
        <button {...props} disabled={hasErrors}/>
    );
};

const validations = {
    required: (value, props) => {
        const label = props.label || 'This field';

        if (!value.toString().trim().length) {
            let text = `${label} is required`;

            return text;
        }
    },
    email: (value, props) => {
        const label = props.label || 'This field';

        if (!validator.isEmail(value)) {
            return `${label} must be valid email address`;
        }
    },
    lt: (value, props) => {
        const label = props.label || 'The value';

        // get the maxLength from component's props
        if ((value.toString().trim().length > props.maxLength)) {
            let text = `${label} must be no more than ${props.maxLength} characters in length`;

            return text;
        }
    },
    gt: (value, props) => {
        const label = props.label || 'The value';

        // get the minLength from component's props
        if ((value.toString().trim().length < props.minLength)) {
            let text = `${label} must be at least ${props.minLength} characters in length`;

            return text;
        }
    },
    password: (value, props) => {
        const label = props.label || 'The value';
        const str = value.toString();

        if(str.length < 6) {
            return `${label} must be at least 6 characters in length`;
        } else if (str.length > 50) {
            return `${label} must be no more than 50 characters in length`;
        } else if (str.search(/\d/) == -1) {
            return `${label} must contain at least 1 numeric character`;
        } else if (str.search(/[A-Z]/) == -1) {
            return `${label} must contain at least 1 capital letter`;
        }
    },
    match: (value, props, components) => {
        const matchWith = props.match;
        const label = props.label || 'This field';

        if (components[matchWith]) {
            const matchWithComponent = components[matchWith][0];
            if (value !== matchWithComponent.value) {
                let text = `${label} does not match`;

                const withLabel = matchWithComponent.label || null;
                if(withLabel) {
                    text += ` with ${withLabel}`;
                }

                return text;
            }
        }
    }
};

// Now call HOCs on components
const Form = form(CustomForm);
const Input = control(CustomInput);
const Button = button(CustomButton);

export {validations, Form, Input, Button};
