import React from "react";
import Flag from "./Flag";

const MexicoFlag = props => (
  <Flag viewBox="0 0 48 48" {...props}>
    <path fill="#E6E6E6" d="M16 6.5h16v36H16z" />
    <path
      fill="#D30F25"
      d="M48 40.5a2 2 0 0 1-2 2H32v-36h14a2 2 0 0 1 2 2v32z"
    />
    <path
      fill="#006847"
      d="M16 42.5H2a2 2 0 0 1-2-2v-32a2 2 0 0 1 2-2h14v36z"
    />
    <path
      fill="#6B422E"
      d="M24 18.5c-3.312 0-6 2.688-6 6a6 6 0 1 0 6-6zm0 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
    />
  </Flag>
);

export default MexicoFlag;
