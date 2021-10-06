import React from "react";
import * as Flags from "../icons/flags";

const CompetitorFlag = ({ name, ...rest }) => {
  const key = `${name.charAt(0).toUpperCase()}${name
    .slice(1)
    .toLowerCase()
    .replace(" ", "")}Flag`;
  if (Flags[key]) {
    return React.createElement(Flags[key], rest);
  } else {
    console.warn(`${key} not found.`);
  }
  return null;
};

export default CompetitorFlag;
