import React from "react";
import Flag from "./Flag";

const SenegalFlag = props => (
  <Flag viewBox="0 0 48 48" {...props}>
    <path fill="#EBCA19" d="M16 6h16v36H16z" />
    <path fill="#DD2027" d="M48 40a2 2 0 0 1-2 2H32V6h14a2 2 0 0 1 2 2v32z" />
    <path
      fill="#0D8643"
      d="M16 42H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h14v36zM30.305 21.723h-4.441L24 17.684l-1.863 4.039h-4.441l3.244 3.359-1.199 4.865 4.26-2.42 4.26 2.42-1.199-4.865 3.243-3.359z"
    />
  </Flag>
);

export default SenegalFlag;
