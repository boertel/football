import { asyncConnect } from "../utils/components";

import { checkAuthentication } from "../resources/auth";

const Auth = (props) => {
  return props.children;
};

export default asyncConnect(null, { load: checkAuthentication })(Auth);
