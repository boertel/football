const ParentComponent = 'Icon';

module.exports = (opts = {}) => {
  return (code, state) => {
    code = code.replace('<svg', `<${ParentComponent}`).replace('</svg>', `</${ParentComponent}>`);
    return `import React from 'react'
import ${ParentComponent} from './${ParentComponent}';

const ${state.componentName} = (props) => ${code}

export default ${state.componentName}`
}
}
