import { combineReducers } from "redux";

import auth from "./auth";
import games from "./games";
import competitor from "./competitor";
import competition from "./competition";
import group from "./group";
import points from "./points";
import user from "./user";
import bet from "./bet";
import friend from "./friend";

export default combineReducers({
  auth,
  games,
  competitor,
  competition,
  group,
  points,
  bet,
  user,
  friend,
});
