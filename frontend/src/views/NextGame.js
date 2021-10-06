import React from "react";
import moment from "moment";
import { connect } from "react-redux";

import { CompetitorFlag } from "../ui";
import { proxy } from "../resources/utils";
import { withParams } from "../utils/components";
import { loadGames } from "../resources/games";
import { CupIcon, StopwatchIcon } from "../icons";
import Task from "../ui/Task";

const NextGame = ({ id, start, competitor_a, competitor_b, competition }) => {
  if (!id) {
    return (
      <div className="tasks next-game">
        <Task
          icon={<CupIcon />}
          message={`${competition.name} is done! Good luck for the next one!`}
        />
      </div>
    );
  }

  const message = (
    <div>
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ marginRight: "1ch" }}>Are you ready for</div>
        <div style={{ marginRight: "1ch" }}>
          <CompetitorFlag name={competitor_a.name} />
        </div>
        <div style={{ marginRight: "1ch" }}>
          <strong>{competitor_a.name}</strong>
        </div>
        <div style={{ marginRight: "1ch" }}>vs.</div>
        <div style={{ marginRight: "1ch" }}>
          <strong>{competitor_b.name}</strong>
        </div>
        <div style={{ marginRight: "1ch" }}>
          <CompetitorFlag name={competitor_b.name} />
        </div>
      </div>
      <div style={{ marginRight: "1ch" }}>
        starting {moment(start).fromNow()}?
      </div>
    </div>
  );
  const to = `../games/${id}`;
  return (
    <div className="tasks next-game">
      <h2>What is next?</h2>
      <Task message={message} icon={<StopwatchIcon />} to={to} />
    </div>
  );
};

const mapStateToProps = (state, { competitionId }) => {
  const nextGame = Object.values(state.games).find(
    ({ start, competition }) =>
      moment(start).isAfter() && competition.id === competitionId
  );
  if (nextGame) {
    return {
      ...proxy(nextGame, state),
    };
  }
  return {
    competition: state.competition[competitionId],
  };
};

export default withParams(
  connect(mapStateToProps, { load: loadGames })(NextGame)
);
