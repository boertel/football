import * as React from "react";
import Flag from "./Flag";

function Icon(props) {
  return (
    <Flag viewBox="0 0 48 48" {...props}>
      <path
        d="M0 8a2 2 0 012-2h44a2 2 0 012 2v32a2 2 0 01-2 2H2a2 2 0 01-2-2V8z"
        fill="#E6E6E6"
      />
      <path d="M0 24h48v16a2 2 0 01-2 2H2a2 2 0 01-2-2V24z" fill="#D80C12" />
      <path
        d="M22.156 22.464a2 2 0 010 3.072L3.28 41.266C1.978 42.352 0 41.426 0 39.73V8.27c0-1.696 1.978-2.622 3.28-1.536l18.876 15.73z"
        fill="#09437F"
      />
    </Flag>
  );
}

export default Icon;
