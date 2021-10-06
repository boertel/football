import React from 'react';

import {
  FieldError,
  TextInput,
} from '../ui';


const TextField = ({ field, form, ...props }) => {
  const { name } = field
  const errors = form.touched[name] && form.errors[name] ? form.errors[name] : null
  const className = errors ? 'danger' : null;
  return (
    <div className="form-input">
      <TextInput {...field} {...props} className={className} />
      <FieldError name={field.name} form={form} />
    </div>
  )
}

export default TextField;
