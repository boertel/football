import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";

const Task = ({ message, icon, className, to }) => {
  const AsComponent = to ? Link : "div";
  return (
    <AsComponent className={cn("task bg-unknow", className)} to={to}>
      <div className="icon">{icon}</div>
      <div className="message">{message}</div>
    </AsComponent>
  );
};

export default Task;
