import React from 'react';
import { withClassNames } from './utils';


const FormGroup = ({label, hint, className, children }) => {
  return (
    <div className={className}>
      <label>{label}{hint ? <em>({hint})</em> : null}</label>
      {children}
    </div>
  );
}

export default withClassNames('form-group')(FormGroup);
