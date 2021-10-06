import React from "react";
import { sortBy } from "lodash";
import { connect } from "react-redux";

import { withParams } from "../utils/components";
import { proxy } from "../resources/utils";
import Task from "../ui/Task";
import { CompetitorFlag } from "../ui";
import { MoreInformationIcon } from "../icons";

const GameTasks = ({ more, games }) => {
  let tasks = games.map(({ id, competitor_a, competitor_b }) => ({
    to: `../games/${id}`,
    icon: (
      <div className="double-flags">
        <CompetitorFlag name={competitor_a.name} cut="bottom" />
        <CompetitorFlag name={competitor_b.name} cut="top" />
      </div>
    ),
    message: (
      <div>
        You haven't predicted <strong>{competitor_a.name}</strong> vs.{" "}
        <strong>{competitor_b.name}</strong>
      </div>
    ),
  }));
  if (more > 2) {
    tasks.push({
      to: `../games#missing`,
      icon: <MoreInformationIcon />,
      message: <div>and {more} more...</div>,
    });
  }
  return (
    <div className="tasks-group">
      {tasks.map((task, index) => (
        <Task {...task} key={index} />
      ))}
    </div>
  );
};

const mapStateToProps = (state, { params }) => {
  const competition = Object.values(state.competition).find(
    ({ slug }) => params.competition === slug
  );
  const games = sortBy(
    Object.values(state.games).filter(
      ({ competition: { id } }) => competition?.id === id
    ),
    "order"
  ).filter((game) => game.bet.id === null);
  return {
    games: games.slice(0, 2).map((game) => proxy(game, state)),
    more: games.length,
  };
};

export default withParams(connect(mapStateToProps)(GameTasks));
