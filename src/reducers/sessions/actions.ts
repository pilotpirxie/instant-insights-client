export enum SessionsActionType {
  Login = "SESSIONS/LOGIN",
  LoginSuccess = "SESSIONS/LOGIN_SUCCESS",
  LoginFailure = "SESSIONS/LOGIN_FAILURE",
  LoginFromLocalStorage = "SESSIONS/LOGIN_FROM_LOCAL_STORAGE",
  RefreshTokens = "SESSIONS/REFRESH_TOKENS",
  Logout = "SESSIONS/LOGOUT",
}

export type LoginFromLocalStorage = {
  type: SessionsActionType.LoginFromLocalStorage;
};

export type RefreshTokens = {
  type: SessionsActionType.RefreshTokens;
  payload: {
    refreshToken: string;
  };
};

export type Login = {
  type: SessionsActionType.Login;
  payload: {
    email: string;
    password: string;
  };
};

export type LoginSuccess = {
  type: SessionsActionType.LoginSuccess;
  payload: {
    token: string;
    tokenExpiresAt: number;
    refreshToken: string;
    refreshTokenExpiresAt: number;
  };
};

export type LoginFailure = {
  type: SessionsActionType.LoginFailure;
  payload: {
    error: string;
  };
};

export type Logout = {
  type: SessionsActionType.Logout;
};
