import { combineReducers } from "redux";

import counter from "./counter/reducer";
import config from "./config/reducer";

export default combineReducers({
  counter,
  config,
});
