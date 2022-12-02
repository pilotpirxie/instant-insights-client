export enum SessionsActionType {
  Login = "SESSIONS/LOGIN",
  LoginSuccess = "SESSIONS/LOGIN_SUCCESS",
  LoginFailure = "SESSIONS/LOGIN_FAILURE",
  Logout = "SESSIONS/LOGOUT",
}

export type LoginInit = {
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
    tokenExpiresAt: Date;
    refreshToken: string;
    refreshTokenExpiresAt: Date;
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
