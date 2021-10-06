import React from "react";
import Flag from "./Flag";

const EgyptFlag = props => (
  <Flag viewBox="0 0 48 48" {...props}>
    <path fill="#3C3C3C" d="M48 40a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V30h48v10z" />
    <path fill="#E6E6E6" d="M0 18h48v12H0z" />
    <path fill="#CC162C" d="M48 18H0V8a2 2 0 0 1 2-2h44a2 2 0 0 1 2 2v10z" />
    <path fill="#EFD358" d="M28 20h-8v5.332L24 28l4-2.668z" />
  </Flag>
);

export default EgyptFlag;
