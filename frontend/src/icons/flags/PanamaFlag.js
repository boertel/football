import React from "react";
import Flag from "./Flag";

const PanamaFlag = props => (
  <Flag viewBox="0 0 48 48" {...props}>
    <path fill="#E6E6E6" d="M24 24H0V8a2 2 0 0 1 2-2h22v18z" />
    <path
      fill="#025193"
      d="M16.184 13.613h-2.947L12 10.93l-1.238 2.684H7.816l2.152 2.227-.797 3.23L12 17.465l2.828 1.605-.797-3.23 2.153-2.227z"
    />
    <path fill="#E6E6E6" d="M48 40a2 2 0 0 1-2 2H24V24h24v16z" />
    <path fill="#025193" d="M0 40a2 2 0 0 0 2 2h22V24H0v16z" />
    <path
      fill="#D21033"
      d="M40.184 31.613h-2.947L36 28.93l-1.238 2.684h-2.945l2.152 2.227-.797 3.231L36 35.465l2.828 1.606-.797-3.231 2.153-2.227zM24 24h24V8a2 2 0 0 0-2-2H24v18z"
    />
  </Flag>
);

export default PanamaFlag;
