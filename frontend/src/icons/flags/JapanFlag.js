import React from "react";
import Flag from "./Flag";

const JapanFlag = props => (
  <Flag viewBox="0 0 48 48" {...props}>
    <g>
      <path
        fill="#E6E6E6"
        d="M48 40a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h44a2 2 0 0 1 2 2v32z"
      />
      <circle fill="#BA0831" cx={24} cy={24} r={10} />
    </g>
  </Flag>
);

export default JapanFlag;
