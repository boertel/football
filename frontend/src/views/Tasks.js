import React from "react";

import UserTasks from "./UserTasks";
import GameTasks from "./GameTasks";
import NextGame from "./NextGame";
import CurrentGames from "./CurrentGames";

const Tasks = () => (
  <main>
    <UserTasks />
    <CurrentGames />
    <NextGame />
    <h2>Here are a few actions you can do today!</h2>
    <GameTasks />
  </main>
);

export default Tasks;
