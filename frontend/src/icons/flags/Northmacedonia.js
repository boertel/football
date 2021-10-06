import * as React from "react";
import Flag from "./Flag";

function Icon(props) {
  return (
    <Flag viewBox="0 0 48 48" {...props}>
      <path
        d="M0 8a2 2 0 012-2h44a2 2 0 012 2v32a2 2 0 01-2 2H2a2 2 0 01-2-2V8z"
        fill="#D91A21"
      />
      <path
        d="M0 27.6v-7.2l48 7.2v-7.2L0 27.6zM21.6 6h4.8L24 20.143 21.6 6zm4.8 36h-4.8L24 27.857 26.4 42zM0 6h7.2l19.005 19.985L0 6zm0 36h7.2l19.005-19.985L0 42zM48 6h-7.2L21.796 25.985 48 6zm0 36h-7.2L21.796 22.015 48 42z"
        fill="#F8E92E"
      />
      <path d="M24 31a7 7 0 100-14 7 7 0 000 14z" fill="#D91A21" />
      <path d="M24 28a4 4 0 100-8 4 4 0 000 8z" fill="#F8E92E" />
    </Flag>
  );
}

export default Icon;
