import React from "react";
import Flag from "./Flag";

const ColombiaFlag = props => (
  <Flag viewBox="0 0 48 48" {...props}>
    <path fill="#FDD116" d="M48 26H0V8a2 2 0 0 1 2-2h44a2 2 0 0 1 2 2v18z" />
    <path fill="#003D8C" d="M0 26h48v8H0z" />
    <path fill="#CB1224" d="M48 40a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-6h48v6z" />
  </Flag>
);

export default ColombiaFlag;
