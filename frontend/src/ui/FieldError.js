import React from 'react';
import { withClassNames } from './utils';


const FieldError = ({ name, form: { touched, errors }, className, }) => {
  if (touched[name] && errors[name]) {
    return <div className={className}>{errors[name]}</div>;
  }
  return null;
}

export default withClassNames('form-field-error')(FieldError);
