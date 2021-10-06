import React from "react";
import Flag from "./Flag";

const EnglandFlag = props => (
  <Flag viewBox="0 0 48 48" {...props}>
    <path
      fill="#E6E6E6"
      d="M48 40a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h44a2 2 0 0 1 2 2v32z"
    />
    <path fill="#FE0000" d="M48 20H28V6h-8v14H0v8h20v14h8V28h20z" />
  </Flag>
);

export default EnglandFlag;
