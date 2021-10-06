import React from "react";
import { connect } from "react-redux";

import Task from "../ui/Task";
import { EmailIcon, CameraFlashIcon, FriendsIcon } from "../icons";

const UserTasks = ({ verified, avatar, gravatar }) => {
  let tasks = [];
  tasks.push({
    icon: <FriendsIcon />,
    message: "Join a group of friends! Keep track of how they're doing.",
    to: "../leaderboard",
  });
  /*
  if (!verified) {
    tasks.push({
      'icon': <EmailIcon />,
      'message': 'Verify your email address so you can get reminders and notifications.',
    });
  }
  if (!avatar) {
    tasks.push({
      'icon': <CameraFlashIcon />,
      'message': 'Looks like your friends can\'t see your beautiful face.',
    });
  }
  */
  return (
    <div className="tasks-group">
      {tasks.map((task, index) => (
        <Task {...task} key={index} />
      ))}
    </div>
  );
};

export default connect((state) => ({ ...state.user[state.auth.id] }))(
  UserTasks
);
