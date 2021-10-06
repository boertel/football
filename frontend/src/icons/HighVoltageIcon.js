import React from "react";
import Icon from "./Icon";

const HighVoltageIcon = props => (
  <Icon viewBox="0 0 72 72" {...props}>
    <path
      fill="#FCEA2B"
      d="M48.1 3.7L16.3 37.9c-.6.6-.1 1.7.8 1.7h19.1L19.2 67c-.2.3.2.5.4.3l36.1-35.7c.6-.6.2-1.7-.8-1.7H36.4L48.1 3.7z"
    />
    <path
      fill="none"
      stroke="#000"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      d="M48.2 4.4L16.3 37.8c-.6.6-.1 1.7.8 1.7h19.1L17.9 68.3l37.7-36.5c.7-.6.2-1.7-.8-1.7H36.4L48.2 4.4z"
    />
  </Icon>
);

export default HighVoltageIcon;

