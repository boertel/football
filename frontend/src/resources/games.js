import { get, keyBy, mapValues } from "lodash";
import api from "../api";
import { createProxify } from "./utils";
import { LOAD as BET_LOAD, CREATE_OR_UPDATE } from "./bet";
import { useDispatch, useSelector } from "react-redux";

export const LOAD = "football/games/LOAD";
export const UPDATE = "football/games/UPDATE";

export const loadGames = ({ competition }) => {
  return (dispatch) => {
    return api.get("/games/", { params: { competition } }).then((response) => {
      dispatch({
        type: LOAD,
        payload: keyBy(response.data, "id"),
      });
    });
  };
};

export const updateGame = (gameId, data) => {
  return (dispatch) => {
    return api.patch(`/games/${gameId}/`, data).then((response) => {
      dispatch({
        type: UPDATE,
        payload: response.data,
      });
    });
  };
};

export const computePoints = (gameId) => {
  return () => {
    return api.post(`/games/${gameId}/compute/`).then((response) => {
      return response;
    });
  };
};

function createAction(dispatch, action, extraArgs = {}) {
  return function (...args) {
    return dispatch(action(...extraArgs, ...args));
  };
}

export function useGames({ competition }) {
  const state = useSelector((state) => state.games);
  const dispatch = useDispatch();

  const actions = {
    loadGames: createAction(dispatch, loadGames, [{ competition }]),
    updateGame: createAction(dispatch, updateGame),
    computePoints: createAction(dispatch, computePoints),
  };

  return [state, actions];
}

const proxify = createProxify({
  competitor_a: "competitor",
  competitor_b: "competitor",
  group: "group",
  bet: "bet",
  competition: "competition",
});

const initialState = {};
export default function (state = initialState, action) {
  switch (action.type) {
    case BET_LOAD:
      const gameId = get(action, ["params", "game"]);
      if (gameId) {
        return {
          ...state,
          [gameId]: {
            ...state[gameId],
            bets: true,
          },
        };
      } else {
        const games = {};
        for (const betId in action.payload) {
          const bet = action.payload[betId];
          games[bet.game.id] = proxify(bet.game);
        }
        return {
          ...state,
          ...games,
        };
      }
      return state;

    case CREATE_OR_UPDATE:
      if (action.payload.score_a !== null && action.payload.score_b !== null) {
        return {
          ...state,
          [action.payload.game]: {
            ...state[action.payload.game],
            bet: action.payload.id,
          },
        };
      }
      return state;

    case LOAD:
      return {
        ...state,
        ...mapValues(action.payload, proxify),
      };

    default:
      return state;
  }
}
