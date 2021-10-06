import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { values, sortBy } from "lodash";

import Bets from "./Bets";
import GameItem from "./Game";
import { Button } from "../ui";
import { withModal } from "../ui/Modal";
import { computePoints } from "../resources/games";

function GameView({ id, next, is_superuser, isLoaded }) {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const _computePoints = () => {
    setIsSubmitting(true);
    dispatch(computePoints(id)).then(() => setIsSubmitting(false));
  };

  return (
    <div>
      {isLoaded && (
        <>
          <GameItem id={id} isView={true} /> <Bets gameId={id} />
        </>
      )}
      <div className="modal-actions">
        {next && (
          <Link className="button secondary" to={`../../games/${next}`}>
            Next
          </Link>
        )}
        {is_superuser ? (
          <Button
            className="button danger"
            submitting={isSubmitting}
            onClick={_computePoints}
          >
            Update points
          </Button>
        ) : null}
      </div>
    </div>
  );
}

const mapStateToProps = (state, { params: { gameId } }) => {
  const id = parseInt(gameId, 10);
  const currentGame = state.games[id];
  const games = Object.values(state.games).filter(
    ({ competition: { id } }) => id === currentGame.competition.id
  );
  const next = sortBy(games, "order").find(
    ({ order }) => order > currentGame.order
  );

  const is_superuser = state.user[state.auth.id].is_superuser;

  return {
    id,
    isLoaded: games.length > 0,
    is_superuser,
    next: next?.id,
  };
};

export default withModal("../../games")(connect(mapStateToProps)(GameView));
