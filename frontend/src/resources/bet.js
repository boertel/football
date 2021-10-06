import api from "../api";
import { createProxify } from "./utils";
import { mapValues, keyBy } from "lodash";

import { LOAD as GAME_LOAD } from "./games";

export const CREATE_OR_UPDATE = "football/bet/CREATE_OR_UPDATE";
export const LOAD = "football/bet/LOAD";

export const createOrUpdateBet = (gameId, data) => {
  return (dispatch) => {
    return api.post(`/games/${gameId}/bets/`, data).then((response) => {
      dispatch({
        type: CREATE_OR_UPDATE,
        payload: response.data,
      });
    });
  };
};

export const loadBets = (params) => {
  console.log(params);
  return (dispatch) => {
    return api.get("/bets/", { params }).then((response) => {
      dispatch({
        type: LOAD,
        params,
        payload: keyBy(response.data, "id"),
      });
    });
  };
};

export const loadBetsForProfile = ({
  params: { userId },
  competition: { slug },
  id,
  ...rest
}) => {
  return loadBets({ user: userId || id, competition: slug });
};

export const loadMyBets = () => {
  return loadBets({ user: "me" });
};

const initialState = {};

const proxify = createProxify({
  game: "games",
  user: "user",
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        ...mapValues(action.payload, proxify),
      };

    case GAME_LOAD:
      let bets = {};
      mapValues(action.payload, ({ bet }) => {
        if (bet !== null) {
          bets[bet.id] = {
            ...state[bet.id],
            ...bet,
          };
        }
      });
      return {
        ...state,
        ...mapValues(bets, proxify),
      };

    case CREATE_OR_UPDATE:
      const betId = action.payload.id;
      return {
        ...state,
        [betId]: {
          ...state[betId],
          ...proxify(action.payload),
        },
      };

    default:
      return state;
  }
}
