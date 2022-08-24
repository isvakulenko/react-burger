import { getCookie, setCookie, deleteCookie } from "../../utils/cookie";
import { AppThunk } from "../../utils/types";
import {
  getUserRequestApi,
  setUserRequestApi,
  loginRequestApi,
  logOutRequestApi,
  createUserApi,
  resetPasswordApi,
  updatePasswordApi,
} from "../../utils/api";

import {
  AUTH_CHECKED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  SET_USER_REQUEST,
  SET_USER_SUCCESS,
  SET_USER_FAILED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILED,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAILED,
  UPD_PASSWORD_REQUEST,
  UPD_PASSWORD_SUCCESS,
  UPD_PASSWORD_FAILED,
  RST_PASSWORD_REQUEST,
  RST_PASSWORD_SUCCESS,
  RST_PASSWORD_FAILED,
} from "../constants";

import { TUser } from "../../utils/types/data";

export type TUserResponce = {
  success: boolean;
  user: TUser;
};

export type TAuthCheckedAction = {
  readonly type: typeof AUTH_CHECKED;
};
export type TGetUserRequestAction = {
  readonly type: typeof GET_USER_REQUEST;
};
export type TGetUserSuccessAction = {
  readonly type: typeof GET_USER_SUCCESS;
  readonly payload: TUser;
};
export type TGetUserFailedAction = {
  readonly type: typeof GET_USER_FAILED;
  readonly payload: string;
};
export type TSetUserRequestAction = {
  readonly type: typeof SET_USER_REQUEST;
};
export type TSetUserSuccessAction = {
  readonly type: typeof SET_USER_SUCCESS;
  payload: TUser;
};
export type TSetUserFailedAction = {
  readonly type: typeof SET_USER_FAILED;
  readonly payload: string;
};
export type TLoginUserRequestAction = {
  readonly type: typeof LOGIN_USER_REQUEST;
};
export type TLoginUserSuccessAction = {
  readonly type: typeof LOGIN_USER_SUCCESS;
  payload: TUser;
};
export type TLoginUserFailedAction = {
  readonly type: typeof LOGIN_USER_FAILED;
  readonly payload: string;
};
export type TLogOutUserRequestAction = {
  readonly type: typeof LOGOUT_USER_REQUEST;
};
export type TLogOutUserSuccessAction = {
  readonly type: typeof LOGOUT_USER_SUCCESS;
};
export type TLogOutUserFailedAction = {
  readonly type: typeof LOGOUT_USER_FAILED;
  readonly payload: string;
};
export type TAddUserRequestAction = {
  readonly type: typeof ADD_USER_REQUEST;
};
export type TAddUserSuccessAction = {
  readonly type: typeof ADD_USER_SUCCESS;
  payload: TUser;
};
export type TAddUserFailedAction = {
  readonly type: typeof ADD_USER_FAILED;
  readonly payload: string;
};
export type TUpdPasswordRequestAction = {
  readonly type: typeof UPD_PASSWORD_REQUEST;
};
export type TUpdPasswordSuccessAction = {
  readonly type: typeof UPD_PASSWORD_SUCCESS;
  payload: string;
};
export type TUpdPasswordFailedAction = {
  readonly type: typeof UPD_PASSWORD_FAILED;
  readonly payload: string;
};
export type TRstPasswordRequestAction = {
  readonly type: typeof RST_PASSWORD_REQUEST;
};
export type TRstPasswordSuccessAction = {
  readonly type: typeof RST_PASSWORD_SUCCESS;
  payload: string;
};
export type TRstPasswordFailedAction = {
  readonly type: typeof RST_PASSWORD_FAILED;
  readonly payload: string;
};
export type TUserActions =
  | TAuthCheckedAction
  | TGetUserRequestAction
  | TGetUserSuccessAction
  | TGetUserFailedAction
  | TSetUserRequestAction
  | TSetUserSuccessAction
  | TSetUserFailedAction
  | TLoginUserRequestAction
  | TLoginUserSuccessAction
  | TLoginUserFailedAction
  | TLogOutUserRequestAction
  | TLogOutUserSuccessAction
  | TLogOutUserFailedAction
  | TAddUserRequestAction
  | TAddUserSuccessAction
  | TAddUserFailedAction
  | TUpdPasswordRequestAction
  | TUpdPasswordSuccessAction
  | TUpdPasswordFailedAction
  | TRstPasswordRequestAction
  | TRstPasswordSuccessAction
  | TRstPasswordFailedAction;

//**********************************************************************************************
// Диспатчим проверку ( checkUserAuth), внутри которой проверяем, есть ли токен, и если есть,
// пытаемся с ним получить данные о себе. В стор сохраним isAuthChecked. Т.е. не важно, что нам вернул getUser,
// мы в любом случае проверку выполнили, isAuthChecked выставив true, и далее в роутах строим
// логику относительно этого. И вторая переделка стора: если в поле data юзер-редьюсера будет содержаться сам юзер, и нам не
// нужен отдельный флаг для этого. Т.е. по умолчанию оно равно null, а вот если проверка токена прошла и мы получили данные с сервера,
// значит юзер действительно теперь может быть авторизован, ставим в data нужный объект, и вперёд,
// опираемся также на это поле при рендеринге разметки/роутов.
// Проверка авторизован ли пользователь нужна в т.ч для защиты страниц login,
// register, forgot-password, reset-password когда пользователь уже авторизован.

// Ни . then, ни .catch, а именно .finally
export const checkAuth = (): AppThunk => (dispatch) => {
  if (getCookie("accessToken")) {
    dispatch(getUser()).finally(() => {
      dispatch({
        type: AUTH_CHECKED,
      });
    });
  } else {
    dispatch({
      type: AUTH_CHECKED,
    });
  }
};

export const getUser = (): AppThunk<Promise<unknown>> => (dispatch) => {
  dispatch({
    type: GET_USER_REQUEST,
  });
  return getUserRequestApi()
    .then((res) => {
      dispatch({
        type: GET_USER_SUCCESS,
        payload: res.user,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_USER_FAILED,
        payload: err.message,
      });
    });
};

// ********************************************************

export const setUser =
  (email: string, name: string, password: string): AppThunk<Promise<unknown>> =>
  (dispatch) => {
    dispatch({
      type: SET_USER_REQUEST,
    });
    return setUserRequestApi(email, name, password)
      .then((res) => {
        dispatch({
          type: SET_USER_SUCCESS,
          payload: res.user,
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_USER_FAILED,
          payload: err.message,
        });
      });
  };

export const logIn =
  (email: string, password: string): AppThunk<Promise<unknown>> =>
  (dispatch) => {
    dispatch({
      type: LOGIN_USER_REQUEST,
    });
    return loginRequestApi(email, password)
      .then((res) => {
        localStorage.setItem("refreshToken", res.refreshToken);
        setCookie("accessToken", res.accessToken);
        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: res.user,
        });
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_USER_FAILED,
          payload: err.message,
        });
      });
  };

export const logOut =
  (token: string): AppThunk<Promise<unknown>> =>
  (dispatch) => {
    dispatch({
      type: LOGOUT_USER_REQUEST,
    });
    return logOutRequestApi(token)
      .then((res) => {
        deleteCookie("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch({
          type: LOGOUT_USER_SUCCESS,
        });
      })
      .catch((err) => {
        dispatch({
          type: LOGOUT_USER_FAILED,
          payload: err.message,
        });
      });
  };

export const registerUser =
  (email: string, password: string, name: string): AppThunk<Promise<unknown>> =>
  (dispatch) => {
    dispatch({
      type: ADD_USER_REQUEST,
    });
    return createUserApi(email, password, name)
      .then((res) => {
        localStorage.setItem("refreshToken", res.refreshToken);
        setCookie("accessToken", res.accessToken);
        dispatch({
          type: ADD_USER_SUCCESS,
          payload: res.user,
        });
      })
      .catch((err) => {
        dispatch({
          type: ADD_USER_FAILED,
          payload: err.message,
        });
      });
  };

export const updatePassword =
  (email: string): AppThunk<Promise<unknown>> =>
  (dispatch) => {
    dispatch({
      type: UPD_PASSWORD_REQUEST,
    });
    return updatePasswordApi(email)
      .then((res) => {
        dispatch({
          type: UPD_PASSWORD_SUCCESS,
          payload: res.message,
        });
      })
      .catch((err) => {
        dispatch({
          type: UPD_PASSWORD_FAILED,
          payload: err.message,
        });
      });
  };

export const resetPassword =
  (password: string, token: string): AppThunk<Promise<unknown>> =>
  (dispatch) => {
    dispatch({
      type: RST_PASSWORD_REQUEST,
    });
    return resetPasswordApi(password, token)
      .then((res) => {
        dispatch({
          type: RST_PASSWORD_SUCCESS,
          payload: res.message,
        });
      })
      .catch((err) => {
        dispatch({
          type: RST_PASSWORD_FAILED,
          payload: err.message,
        });
      });
  };
