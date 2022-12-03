import produce from "immer";
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
  tokenExpiresAt: number;
  refreshToken: string;
  refreshTokenExpiresAt: number;
  error: string;
  status: ReduxStatuses;
};

const initialState: Sessions = {
  token: "",
  refreshToken: "",
  refreshTokenExpiresAt: 0,
  tokenExpiresAt: 0,
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
        newState.token = "";
        newState.tokenExpiresAt = 0;
        newState.refreshToken = "";
        newState.refreshTokenExpiresAt = 0;
        break;
      case SessionsActionType.Logout:
        newState.token = "";
        newState.tokenExpiresAt = 0;
        newState.refreshToken = "";
        newState.refreshTokenExpiresAt = 0;
        newState.status = ReduxStatuses.Init;
        newState.error = "";
        break;
      default:
        return state;
    }
  });
}
