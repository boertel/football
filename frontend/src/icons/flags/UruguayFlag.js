import React from "react";
import Flag from "./Flag";

const UruguayFlag = props => (
  <Flag viewBox="0 0 48 48" {...props}>
    <g>
      <path
        fill="#E6E6E6"
        d="M48 8a2 2 0 0 0-2-2H18v20H0v14a2 2 0 0 0 2 2h44a2 2 0 0 0 2-2V8z"
      />
      <path
        fill="#0437AC"
        d="M18 10h30v4H18zM18 18h30v4H18zM0 26v4h48v-4H20zM0 34h48v4H0z"
      />
      <path fill="#E6E6E6" d="M18 26H0V8a2 2 0 0 1 2-2h16v20z" />
      <circle fill="#B09405" cx={10} cy={16} r={4} />
    </g>
  </Flag>
);

export default UruguayFlag;
