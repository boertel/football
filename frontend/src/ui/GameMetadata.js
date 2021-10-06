import React from "react";
import Time from "./Time";
import Badge from "./Badge";
import StatusBadge from "./StatusBadge";

const GameMetadata = ({ group, start, gameId, venue }) => {
  let children = [];

  return (
    <>
      <Badge
        className={`${group.name.replace(" ", "").toLowerCase()} game-header`}
      >
        {group.name}
      </Badge>
      <Time className="game-header" time={start} format="LT" />
      <StatusBadge className="game-header" gameId={gameId} venue={venue} />
    </>
  );
};

export default GameMetadata;
