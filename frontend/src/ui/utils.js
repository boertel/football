import React from 'react';
import classNames from 'classnames';


export const withClassNames = function () {
  const args = Array.prototype.slice.call(arguments);
  return WrappedComponent => {
    const WithClassNames = props => {
      const computedClassNames = args.map(arg => {
        switch (typeof arg) {
          case 'function':
            return arg(props);
          default:
            return arg;
        }
      });

      const className = classNames.apply(classNames, computedClassNames.concat([props.className]));
      if (typeof WrappedComponent === 'string') {
        return React.createElement(WrappedComponent, {...props, className, });
      } else {
        return <WrappedComponent {...props} className={className} />
      }
    }

    return WithClassNames;
  }
}
