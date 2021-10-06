import React from "react";
import Flag from "./Flag";

const SwitzerlandFlag = props => (
  <Flag viewBox="0 0 48 48" {...props}>
    <path
      fill="#DA1E05"
      d="M48 40a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h44a2 2 0 0 1 2 2v32z"
    />
    <path
      fill="#FFF"
      d="M35 28H13a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h22a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1z"
    />
    <path
      fill="#FFF"
      d="M27 36h-6a1 1 0 0 1-1-1V13a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v22a1 1 0 0 1-1 1z"
    />
  </Flag>
);

export default SwitzerlandFlag;
