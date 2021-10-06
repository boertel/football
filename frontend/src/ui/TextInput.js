import React, { Component } from 'react';
import { withClassNames } from './utils';


class TextInput extends Component {
  render() {
    return <input type="text" {...this.props} />
  }
}

export default withClassNames('text-input')(TextInput);
