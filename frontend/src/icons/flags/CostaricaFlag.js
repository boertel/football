import React from "react";
import Flag from "./Flag";

const CostaricaFlag = props => (
  <Flag viewBox="0 0 48 48" {...props}>
    <path fill="#1D266B" d="M48 40a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-4h48v4z" />
    <path fill="#EA212D" d="M0 18h48v12H0z" />
    <path fill="#1D266B" d="M48 12H0V8a2 2 0 0 1 2-2h44a2 2 0 0 1 2 2v4z" />
    <path fill="#E6E6E6" d="M0 30h48v6H0zM0 12h48v6H0z" />
    <path
      fill="#FFF"
      d="M14 20a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6a2 2 0 1 1-.001-3.999A2 2 0 0 1 14 26z"
    />
  </Flag>
);

export default CostaricaFlag;
