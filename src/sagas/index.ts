import { takeLatest } from "redux-saga/effects";
import { SessionsActionType } from "../reducers/sessions/actions";
import * as sessions from "./Sessions";

// eslint-disable-next-line no-empty-function
export default function* rootSaga() {
  yield takeLatest(
    SessionsActionType.LoginFromLocalStorage,
    sessions.loginFromLocalStorage
  );

  yield takeLatest(SessionsActionType.Login, sessions.login);

  yield takeLatest(SessionsActionType.RefreshTokens, sessions.refreshTokens);
}
