import React from "react";
import Flag from "./Flag";

const IranFlag = props => (
  <Flag viewBox="0 0 48 48" {...props}>
    <path fill="#D70A16" d="M48 40a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V30h48v10z" />
    <path fill="#E6E6E6" d="M0 18h48v12H0z" />
    <path fill="#2B9E45" d="M48 18H0V8a2 2 0 0 1 2-2h44a2 2 0 0 1 2 2v10z" />
    <path
      fill="#D70A16"
      d="M24 20a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6a2 2 0 1 1-.001-3.999A2 2 0 0 1 24 26z"
    />
  </Flag>
);

export default IranFlag;
