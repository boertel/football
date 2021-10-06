import React from "react";
import Flag from "./Flag";

const PortugalFlag = props => (
  <Flag viewBox="0 0 48 48" {...props}>
    <g>
      <path fill="#060" d="M18 42H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16v36z" />
      <path fill="#FE0000" d="M48 40a2 2 0 0 1-2 2H18V6h28a2 2 0 0 1 2 2v32z" />
      <circle fill="#FAFB00" cx={18} cy={22} r={6} />
    </g>
  </Flag>
);

export default PortugalFlag;
