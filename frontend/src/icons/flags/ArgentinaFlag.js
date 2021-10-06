import React from "react";
import Flag from "./Flag";

const ArgentinaFlag = props => (
  <Flag viewBox="0 0 48 48" {...props}>
    <path fill="#7FA9CF" d="M48 18H0V8a2 2 0 0 1 2-2h44a2 2 0 0 1 2 2v10z" />
    <path fill="#E6E6E6" d="M0 18h48v12H0z" />
    <path fill="#7FA9CF" d="M48 40a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V30h48v10z" />
    <path fill="#EFD358" d="M24 20a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
  </Flag>
);

export default ArgentinaFlag;
