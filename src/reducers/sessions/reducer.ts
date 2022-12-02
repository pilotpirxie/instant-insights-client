import produce from "immer";

import dayjs from "dayjs";
import {
  Login,
  LoginFailure,
  LoginFromLocalStorage,
  LoginSuccess,
  Logout,
  RefreshTokens,
  SessionsActionType,
} from "./actions";
import ReduxStatuses from "../../utils/reduxStatuses";

export type Sessions = {
  token: string;
  tokenExpiresAt: Date;
  refreshToken: string;
  refreshTokenExpiresAt: Date;
  error: string;
  status: ReduxStatuses;
};

const initialState: Sessions = {
  token: "",
  refreshToken: "",
  refreshTokenExpiresAt: dayjs().toDate(),
  tokenExpiresAt: dayjs().toDate(),
  error: "",
  status: ReduxStatuses.Init,
};

export type Action =
  | LoginSuccess
  | Login
  | LoginFailure
  | Logout
  | RefreshTokens
  | LoginFromLocalStorage;

export default function reducer(
  state: Sessions = initialState,
  action: Action
): Sessions {
  return produce(state, (newState) => {
    switch (action.type) {
      case SessionsActionType.Login:
        newState.error = "";
        newState.status = ReduxStatuses.Pending;
        break;
      case SessionsActionType.LoginSuccess:
        newState.token = action.payload.token;
        newState.tokenExpiresAt = action.payload.tokenExpiresAt;
        newState.refreshToken = action.payload.refreshToken;
        newState.refreshTokenExpiresAt = action.payload.refreshTokenExpiresAt;
        newState.status = ReduxStatuses.Success;
        break;
      case SessionsActionType.LoginFailure:
        newState.error = action.payload.error;
        newState.status = ReduxStatuses.Failure;
        break;
      case SessionsActionType.Logout:
        newState.token = "";
        newState.tokenExpiresAt = dayjs().toDate();
        newState.refreshToken = "";
        newState.refreshTokenExpiresAt = dayjs().toDate();
        newState.status = ReduxStatuses.Init;
        break;
      default:
        return state;
    }
  });
}
