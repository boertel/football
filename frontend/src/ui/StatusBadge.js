import React from "react";
import moment from "moment";
import get from "lodash/get";
import { connect } from "react-redux";
import { getStatus, proxy } from "../resources/utils";
import Badge from "./Badge";

const Points = ({ status, live, venue, points }) => {
  if (live) {
    return <Badge className="live">Live</Badge>;
  } else if (points !== undefined) {
    return (
      <Badge className={`${status} points`}>
        {points !== 0 ? "+" : ""}
        {points} points
      </Badge>
    );
  } else {
    return (
      <div style={{ textAlign: "right", color: "var(--grey-300)" }}>
        {venue}
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  const game = proxy(state.games[ownProps.gameId], state);
  const status = getStatus(game.score_a, game.score_b, game.bet);
  const points = get(game.group.points, status);
  const start = game.start;
  const live = moment().isBetween(start, moment(start).add(120, "minutes"));
  return {
    status,
    points,
    live,
  };
};

export default connect(mapStateToProps)(Points);
