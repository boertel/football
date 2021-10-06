import React from "react";
import Flag from "./Flag";

const SaudiArabiaFlag = props => (
  <Flag viewBox="0 0 48 48" {...props}>
    <path
      fill="#0B6B37"
      d="M48 40a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h44a2 2 0 0 1 2 2v32z"
    />
    <path
      fill="#FFF"
      d="M38 14v2h-6v2h6v2h-6v2h6v2h-6v2h6v2h-8v-8h-2v2h-2v2h2v4h-4V18h-2v10h-2V18h-2v10h-2v-6h-6v-2h6v-2h-6v-4H8v16h32V14h-2zM10 28v-4h4v4h-4z"
    />
    <path
      fill="#FFF"
      d="M12 14h2v2h-2zM18 14h6v2h-6zM26 16h4v2h-4zM8 34h32v2H8z"
    />
  </Flag>
);

export default SaudiArabiaFlag;
