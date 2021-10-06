import React from "react";
import Flag from "./Flag";

const RussiaFlag = props => (
  <Flag viewBox="0 0 48 48" {...props}>
    <path fill="#E00" d="M48 40a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V30h48v10z" />
    <path fill="#0000FE" d="M0 18h48v12H0z" />
    <path fill="#E6E6E6" d="M48 18H0V8a2 2 0 0 1 2-2h44a2 2 0 0 1 2 2v10z" />
  </Flag>
);

export default RussiaFlag;
