import React from "react";
import Flag from "./Flag";

const BelgiumFlag = props => (
  <Flag viewBox="0 0 48 48" {...props}>
    <path fill="#FFDE00" d="M16 6h16v36H16z" />
    <path fill="#E00" d="M48 40a2 2 0 0 1-2 2H32V6h14a2 2 0 0 1 2 2v32z" />
    <path d="M16 42H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h14v36z" />
  </Flag>
);

export default BelgiumFlag;
