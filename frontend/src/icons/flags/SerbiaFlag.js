import React from "react";
import Flag from "./Flag";

const SerbiaFlag = props => (
  <Flag viewBox="0 0 48 48" {...props}>
    <path fill="#DD2026" d="M48 18H0V8a2 2 0 0 1 2-2h44a2 2 0 0 1 2 2v10z" />
    <path fill="#233E85" d="M0 18h48v12H0z" />
    <path fill="#E6E6E6" d="M48 40a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V30h48v10z" />
    <path fill="#EE1E2E" d="M18 18H6v12l6 4 6-4z" />
    <path fill="#FFF" d="M8 20h8v6H8zM12 32l4-4H8z" />
    <path fill="#F5E303" d="M8 14v2h2v2h4v-2h2v-2z" />
  </Flag>
);

export default SerbiaFlag;
