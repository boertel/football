import api from "../api";
import { keyBy, mapValues } from "lodash";
import { LOAD as GAMES_LOAD } from "./games";
import { LOAD as BETS_LOAD } from "./bet";
import { createProxify } from "./utils";

export const LOAD = "football/group/LOAD";

export const loadGroups = () => {
  return (dispatch) => {
    return api.get("/groups/").then((response) => {
      dispatch({
        type: LOAD,
        payload: keyBy(response.data, "id"),
      });
    });
  };
};

const initialState = {};

const proxify = createProxify({
  points: "points",
});

export default function (state = initialState, action) {
  let games = {};
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        ...action.payload,
      };

    case GAMES_LOAD:
      games = action.payload;

    case BETS_LOAD:
      for (const betId in action.payload) {
        const bet = action.payload[betId];
        if (typeof bet.game === "object") {
          games[bet.game.id] = bet.game;
        }
      }

    case GAMES_LOAD:
      let groups = {};
      mapValues(games, ({ group }) => {
        groups[group.id] = {
          ...state[group.id],
          ...group,
        };
      });
      return {
        ...state,
        ...mapValues(groups, proxify),
      };

    default:
      return state;
  }
}
