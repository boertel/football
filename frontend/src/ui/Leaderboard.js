import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { sortBy, values } from "lodash";
import { withClassNames } from "../ui/utils";

const User = connect((state, ownProps) => ({ ...state.user[ownProps.id] }))(
  withClassNames("user")(
    ({ id, className, rank, full_name, competitions, me }) => {
      const { competition } = useParams();
      const points = competitions.find(({ slug }) => competition === slug)
        ?.points;
      let rankLabel = `${rank}.`;
      if (rank === 1) {
        rankLabel = (
          <span style={{ fontSize: "2em", paddingRight: "6px" }}>🥇 </span>
        );
      }
      if (rank === 2) {
        rankLabel = (
          <span style={{ fontSize: "2em", paddingRight: "6px" }}>🥈 </span>
        );
      }
      if (rank === 3) {
        rankLabel = (
          <span style={{ fontSize: "2em", paddingRight: "6px" }}>🥉 </span>
        );
      }
      return (
        <Link
          to={`../profile/${id}`}
          className={`${className}${me ? " me" : ""}`}
        >
          <div
            className="full-name"
            style={{ display: "flex", alignItems: "center" }}
          >
            {rankLabel} {full_name}
          </div>
          <div className="points">{points} points</div>
        </Link>
      );
    }
  )
);

const Leaderboard = ({
  currentUserId,
  className,
  children,
  competition,
  ...props
}) => {
  const users = Object.values(props.users)
    .map((user) => {
      return {
        ...user,
        points: user.competitions.find(({ slug }) => competition === slug)
          ?.points,
      };
    })
    .filter(({ points }) => points !== undefined);

  const leaderboard = sortBy(
    sortBy(values(users), "full_name").reverse(),
    "points"
  ).reverse();
  let rank = 0;
  let previousPoints = -1;
  const title = children ? (
    <h3>
      Leaderboard {children} ({leaderboard.length})
    </h3>
  ) : (
    <h3>Leaderboard ({leaderboard.length})</h3>
  );
  return (
    <div className={className}>
      {title}
      <div className="list">
        {leaderboard.map(({ id, points }) => {
          if (points !== previousPoints) {
            rank += 1;
          }
          previousPoints = points;
          const me = currentUserId === id;
          return <User key={id} me={me} id={id} rank={rank} />;
        })}
      </div>
    </div>
  );
};

export default withClassNames("leaderboard")(Leaderboard);
