import { combineReducers } from "redux";

import sessions from "./sessions/reducer";
import config from "./config/reducer";

export default combineReducers({
  sessions,
  config,
});
