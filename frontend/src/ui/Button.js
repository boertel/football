import React from 'react';
import { withClassNames } from './utils';


const Button = ({ submitting, children, ...rest }) => {
  children = submitting ? 'Submitting...' : children;
  return <button {...rest}>{children}</button>
};

export default withClassNames('button')(Button);
