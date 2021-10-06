import { asyncConnect } from "../utils/components";
import { GameCard } from "../ui";
import { proxy } from "../resources/utils";

const mapStateToProps = (state, ownProps) => ({
  ...proxy(state.games[ownProps.id], state, ["bet"]),
});

const Game = asyncConnect(mapStateToProps)((props) => {
  return <GameCard {...props} />;
});

export default Game;
