import React from "react";
import Flag from "./Flag";

const IcelandFlag = props => (
  <Flag viewBox="0 0 48 48" {...props}>
    <path
      fill="#003897"
      d="M48 40a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h44a2 2 0 0 1 2 2v32z"
    />
    <path fill="#FFF" d="M22 18V6H10v12H0v12h10v12h12V30h26V18H22z" />
    <path fill="#D62827" d="M12 6h8v36h-8z" />
    <path fill="#D62827" d="M0 20h48v8H0z" />
  </Flag>
);

export default IcelandFlag;
