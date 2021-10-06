import * as React from "react";
import Flag from "./Flag";

function Icon(props) {
  return (
    <Flag viewBox="0 0 48 48" {...props}>
      <path
        d="M46 6H2a2 2 0 00-2 2v32a2 2 0 002 2h44a2 2 0 002-2V8a2 2 0 00-2-2z"
        fill="#005EB8"
      />
      <mask
        id="prefix__a"
        maskUnits="userSpaceOnUse"
        x={0}
        y={6}
        width={48}
        height={36}
      >
        <path
          d="M46 6H2a2 2 0 00-2 2v32a2 2 0 002 2h44a2 2 0 002-2V8a2 2 0 00-2-2z"
          fill="#E6E6E6"
        />
      </mask>
      <g mask="url(#prefix__a)">
        <path d="M0 42L48 6M0 6l48 36L0 6z" stroke="#fff" strokeWidth={5.76} />
      </g>
    </Flag>
  );
}

export default Icon;
