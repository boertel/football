import React from 'react';
import moment from 'moment';
import { withClassNames } from './utils';

const Time = ({ time, format, className, }) => {
  return <div className={className}>{moment(time).format(format)}</div>
}

Time.defaultProps = {
  format: 'LLL',
};

export default withClassNames('time')(Time);
