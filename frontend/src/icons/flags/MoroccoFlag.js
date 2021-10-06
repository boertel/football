import React from "react";
import Flag from "./Flag";

const MoroccoFlag = props => (
  <Flag viewBox="0 0 48 48" {...props}>
    <path
      fill="#C0272C"
      d="M48 40a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h44a2 2 0 0 1 2 2v32z"
    />
    <path
      fill="#484C29"
      d="M32.361 21.041H26.47L24 15.683l-2.472 5.358h-5.89l4.304 4.453-1.591 6.453L24 28.739l5.648 3.208-1.591-6.453 4.304-4.453zm-5.767 6.871L24 26.438l-2.594 1.474.743-3.014-1.796-1.857h2.454L24 20.458l1.191 2.583h2.455l-1.796 1.857.744 3.014z"
    />
  </Flag>
);

export default MoroccoFlag;
