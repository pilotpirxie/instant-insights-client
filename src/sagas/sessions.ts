import { delay, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import {
  Login,
  RefreshTokens,
  SessionsActionType,
} from "../reducers/sessions/actions";
import axiosInstance from "../utils/httpClient";

dayjs.extend(utc);

export function* loginFromLocalStorage() {
  try {
    yield delay(200);
    const token = localStorage.getItem("token");
    const tokenExpiresAt = localStorage.getItem("tokenExpiresAt");
    const refreshToken = localStorage.getItem("refreshToken");
    const refreshTokenExpiresAt = localStorage.getItem("refreshTokenExpiresAt");
    if (
      token &&
      tokenExpiresAt &&
      refreshToken &&
      refreshTokenExpiresAt &&
      dayjs(Number(refreshTokenExpiresAt)) > dayjs()
    ) {
      yield put({
        type: SessionsActionType.RefreshTokens,
        payload: {
          refreshToken,
        },
      });
    } else {
      yield put({
        type: SessionsActionType.LoginFailure,
        payload: {
          error: "No token in local storage",
        },
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put({
        type: SessionsActionType.LoginFailure,
        payload: {
          error: error.message,
        },
      });
    }
  }
}

type LoginResponse = {
  token: string;
  tokenExpiresAt: number;
  refreshToken: string;
  refreshTokenExpiresAt: number;
};

export function* login(action: Login) {
  try {
    yield delay(200);

    const response: AxiosResponse<LoginResponse> = yield axiosInstance.post(
      "/users/login",
      {
        email: action.payload.email,
        password: action.payload.password,
      }
    );

    const { token, tokenExpiresAt, refreshToken, refreshTokenExpiresAt } =
      response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("tokenExpiresAt", tokenExpiresAt.toString());
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem(
      "refreshTokenExpiresAt",
      refreshTokenExpiresAt.toString()
    );

    yield put({
      type: SessionsActionType.LoginSuccess,
      payload: {
        token,
        tokenExpiresAt,
        refreshToken,
        refreshTokenExpiresAt,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      yield put({
        type: SessionsActionType.LoginFailure,
        payload: {
          error: error.message,
        },
      });
    }
  }
}

export function* refreshTokens(action: RefreshTokens) {
  try {
    yield delay(200);

    const response: AxiosResponse<LoginResponse> = yield axiosInstance.post(
      "/users/refresh-token",
      {
        refreshToken: action.payload.refreshToken,
      }
    );

    const { token, tokenExpiresAt, refreshToken, refreshTokenExpiresAt } =
      response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("tokenExpiresAt", tokenExpiresAt.toString());
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem(
      "refreshTokenExpiresAt",
      refreshTokenExpiresAt.toString()
    );
    yield put({
      type: SessionsActionType.LoginSuccess,
      payload: {
        token,
        tokenExpiresAt: dayjs(tokenExpiresAt).toDate(),
        refreshToken,
        refreshTokenExpiresAt: dayjs(refreshTokenExpiresAt).toDate(),
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      yield put({
        type: SessionsActionType.LoginFailure,
        payload: {
          error: error.message,
        },
      });
    }
  }
}

// eslint-disable-next-line require-yield
export function* logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpiresAt");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("refreshTokenExpiresAt");
}
