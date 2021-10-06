import React from "react";
import Flag from "./Flag";

const SpainFlag = props => (
  <Flag viewBox="0 0 48 48" {...props}>
    <path fill="#C60B1E" d="M48 16H0V8a2 2 0 0 1 2-2h44a2 2 0 0 1 2 2v8z" />
    <path fill="#FFC300" d="M0 16h48v16H0z" />
    <path fill="#C60B1E" d="M48 40a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-8h48v8z" />
    <path
      fill="#91443A"
      d="M14 20v-2H6v2h2v2H6v5.332L10 30l4-2.668V22h-2v-2z"
    />
  </Flag>
);

export default SpainFlag;
