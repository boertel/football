import React from "react";
import Flag from "./Flag";

const TunisiaFlag = props => (
  <Flag viewBox="0 0 48 48" {...props}>
    <g>
      <path
        fill="#E31E25"
        d="M48 40a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h44a2 2 0 0 1 2 2v32z"
      />
      <circle fill="#FFF" cx={24} cy={24} r={12} />
      <path
        fill="#E31E25"
        d="M27.199 30.4c-3.533 0-6.4-2.866-6.4-6.4s2.867-6.4 6.4-6.4c.693 0 1.346.139 1.971.342C27.771 16.748 25.98 16 24 16c-4.42 0-8 3.582-8 8s3.58 8 8 8c1.98 0 3.771-.748 5.17-1.941-.625.203-1.277.341-1.971.341z"
      />
      <path
        fill="#E31E25"
        d="M29.258 22.706l-1.229-2.665-1.23 2.665H24l2.047 2.117L25.264 28l2.766-1.571L30.795 28l-.783-3.177 2.047-2.117h-2.801z"
      />
    </g>
  </Flag>
);

export default TunisiaFlag;
