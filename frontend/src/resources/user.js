import api from "../api";
import { forEach, get, mapValues, keyBy } from "lodash";
import { LOAD as BET_LOAD } from "./bet";
import { LOAD as FRIEND_LOAD } from "./friend";
import { LOGOUT, LOAD as AUTH_LOAD } from "./auth";

export const LOAD = "football/user/LOAD";
export const LOAD_USERS = "football/user/LOAD_USERS";

export function loadUser(props) {
  return (dispatch) => {
    const userId = get(props, "params.userId", "me");
    return api.get(`/users/${userId}/`).then((response) => {
      if (response.data.ok !== false) {
        dispatch({
          type: LOAD,
          payload: response.data,
        });
      }
    });
  };
}

export function loadUsers() {
  return (dispatch) => {
    return api.get("/users/").then((response) => {
      dispatch({
        type: LOAD_USERS,
        payload: keyBy(response.data, "id"),
      });
    });
  };
}

const initialState = {};

export default function (state = initialState, action) {
  let users = {};
  switch (action.type) {
    case LOAD:
    case AUTH_LOAD:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload,
        },
      };

    case LOAD_USERS:
      return {
        ...state,
        ...mapValues(action.payload, (value, id) => ({
          ...state[id],
          ...value,
        })),
      };

    case FRIEND_LOAD:
      forEach(action.payload, (value, key) => {
        const members = value.members;
        mapValues(members, (user) => {
          users[user.id] = {
            ...state[user.id],
            ...user,
          };
        });
      });
      return {
        ...state,
        ...users,
      };

    case BET_LOAD:
      mapValues(action.payload, (bet) => {
        if (typeof bet.user === "object" && bet.user !== null) {
          let user = bet.user;
          users[user.id] = {
            ...state[user.id],
            ...user,
          };
        }
      });
      return {
        ...state,
        ...users,
      };

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
}
