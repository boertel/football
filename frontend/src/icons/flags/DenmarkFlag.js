import React from "react";
import Flag from "./Flag";

const DenmarkFlag = props => (
  <Flag viewBox="0 0 48 48" {...props}>
    <path
      fill="#D00C32"
      d="M48 40a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h44a2 2 0 0 1 2 2v32z"
    />
    <path fill="#E6E6E6" d="M12 6h8v36h-8z" />
    <path fill="#E6E6E6" d="M0 20h48v8H0z" />
  </Flag>
);

export default DenmarkFlag;
