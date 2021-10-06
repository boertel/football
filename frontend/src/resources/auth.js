import api from "../api";
import { useSelector } from "react-redux";

export const LOAD = "football/auth/LOAD";
export const AUTHENTICATED = "football/auth/AUTHENTICATED";
export const LOGOUT = "football/auth/LOGOUT";

export function checkAuthentication() {
  return (dispatch) => {
    return api
      .get("/users/me/")
      .then((response) => {
        if (response.data.ok !== false) {
          authenticated(response).map(dispatch);
          return response;
        }
      })
      .catch(() => {});
  };
}

const authenticated = (response) => [
  {
    type: AUTHENTICATED,
    payload: {
      authenticated: true,
      id: response.data.id,
    },
  },
  {
    type: LOAD,
    payload: response.data,
  },
];

export function login(data) {
  return (dispatch) => {
    return api.post("/auth/login/", data).then((response) => {
      authenticated(response).map(dispatch);
      return response;
    });
  };
}

export function signup(data) {
  return (dispatch) => {
    return api.post("/auth/register/", data).then((response) => {
      authenticated(response).map(dispatch);
      return response;
    });
  };
}

export function logout() {
  return (dispatch) => {
    return api.post("/auth/logout/").then((response) => {
      dispatch({
        type: AUTHENTICATED,
        payload: {
          authenticated: false,
        },
      });
      dispatch({
        type: LOGOUT,
      });
    });
  };
}

export function forgot(data) {
  return (dispatch) => {
    return api.post("/auth/password/reset/", data).then((response) => {
      authenticated(response).map(dispatch);
      return response;
    });
  };
}

export function reset(data) {
  return (dispatch) => {
    return api.post("/auth/password/reset/confirm/", data).then((response) => {
      authenticated(response).map(dispatch);
      return response;
    });
  };
}

export function useAuth() {
  return useSelector(({ auth }) => auth);
}

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATED:
      return {
        ...state,
        ...action.payload,
      };

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
}
