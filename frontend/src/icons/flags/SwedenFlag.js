import React from "react";
import Flag from "./Flag";

const SwedenFlag = props => (
  <Flag viewBox="0 0 48 48" {...props}>
    <path
      fill="#0A5189"
      d="M48 40a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h44a2 2 0 0 1 2 2v32z"
    />
    <path fill="#EFD358" d="M48 20H20V6h-8v14H0v8h12v14h8V28h28z" />
  </Flag>
);

export default SwedenFlag;
