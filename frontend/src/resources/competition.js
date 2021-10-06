import api from "../api";
import { keyBy, mapValues } from "lodash";
import { LOAD as GAMES_LOAD } from "./games";

export const LOAD = "football/competition/LOAD";

export const loadCompetitions = () => {
  return (dispatch) => {
    return api.get("/competitions/").then((response) => {
      dispatch({
        type: LOAD,
        payload: keyBy(response.data, "id"),
      });
    });
  };
};

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        ...action.payload,
      };

    case GAMES_LOAD:
      let competitions = {};
      mapValues(action.payload, ({ competition }) => {
        competitions[competition.id] = {
          ...state[competition.id],
          ...competition,
        };
      });
      return {
        ...state,
        ...competitions,
      };

    default:
      return state;
  }
}
