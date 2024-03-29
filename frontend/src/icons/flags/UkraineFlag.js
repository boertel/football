import React from "react";
import Flag from "./Flag";

const UkraineFlag = (props) => (
  <Flag viewBox="0 0 48 48" {...props}>
    <path fill="#005BBC" d="M48 40a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V24h48v16z" />
    <path fill="#FED702" d="M48 24H0V8a2 2 0 0 1 2-2h44a2 2 0 0 1 2 2v16z" />
  </Flag>
);

export default UkraineFlag;
