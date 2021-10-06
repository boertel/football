import React from "react";
import { sortBy, values } from "lodash";
import moment from "moment";
import { connect } from "react-redux";

import { proxy } from "../resources/utils";
import { Badge, Task, CompetitorFlag } from "../ui";
import { ClappingHandsIcon } from "../icons";

const CurrentGame = connect((state, ownProps) => ({
  ...proxy(state.games[ownProps.id], state),
}))(({ id, competitor_a, competitor_b, className }) => {
  const to = `../games/${id}`;
  const message = (
    <div className="current-game">
      <CompetitorFlag name={competitor_a.name} />
      <strong>{competitor_a.name}</strong>&nbsp;vs.&nbsp;
      <strong>{competitor_b.name} </strong>
      <CompetitorFlag name={competitor_b.name} />
    </div>
  );
  return (
    <Task
      message={message}
      className={className}
      icon={<ClappingHandsIcon />}
      to={to}
    />
  );
});

const CurrentGames = ({ games }) => {
  if (games.length === 0) {
    return null;
  }
  const liveGames = games.filter(({ start }) =>
    moment().isBetween(
      moment(start).subtract(15, "minutes"),
      moment(start).add(120, "minutes")
    )
  );
  if (liveGames.length > 0) {
    const title = liveGames.length === 1 ? "Game" : "Games";
    return (
      <div className="current-games">
        <h3>
          <div>{title} happening right now!</div>
          <Badge className="live">Live</Badge>
        </h3>
        {liveGames.map(({ id }) => (
          <CurrentGame key={id} id={id} className="bg-current" />
        ))}
      </div>
    );
  }

  return null;
};

const mapStateToProps = (state) => {
  const games = sortBy(
    values(state.games).filter(({ start }) => moment().isSame(start, "day")),
    "order"
  );
  return {
    games,
  };
};

export default connect(mapStateToProps)(CurrentGames);
