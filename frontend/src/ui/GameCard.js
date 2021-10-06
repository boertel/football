import React from "react";
import moment from "moment";
import cn from "classnames";

import { withClassNames } from "./utils";
import GameMetadata from "./GameMetadata";
import GameScore from "./GameScore";
import { getStatus } from "../resources/utils";

class GameCard extends React.Component {
  render() {
    const {
      id,
      start,
      competitor_a,
      competitor_b,
      score_a,
      score_b,
      bet,
      group,
      locked,
      venue,
      isView,
    } = this.props;

    const status = getStatus(score_a, score_b, bet);
    const live = moment().isBetween(start, moment(start).add(120, "minutes"));
    const className = cn(this.props.className, status, { current: live });

    const predictions = locked
      ? [
          <div key="title">
            <h4>Your predictions</h4>
          </div>,
          <div
            key="predictions"
            className={cn("predictions", `text-${status}`)}
          >
            {bet.score_a} – {bet.score_b}
          </div>,
          <div key="empty" />,
          //<div key="progress" className="progress-bar"></div>,
        ]
      : null;

    return (
      <div className={className}>
        <GameMetadata group={group} start={start} gameId={id} venue={venue} />
        <GameScore
          className="competitor-a"
          name="score_a"
          competitor_name={competitor_a.name}
          id={id}
          locked={locked}
          autoFocus={isView ? !locked : false}
        />
        <GameScore
          className="competitor-b"
          name="score_b"
          competitor_name={competitor_b.name}
          id={id}
          locked={locked}
        />
        {predictions}
      </div>
    );
  }
}

export default withClassNames("game-card")(GameCard);
