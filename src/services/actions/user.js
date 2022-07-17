import { getCookie, setCookie, deleteCookie } from "../../utils/cookie";
import {
  getUserRequestApi,
  setUserRequestApi,
  loginRequestApi,
  logOutRequestApi,
  createUserApi,
  resetPasswordApi,
  updatePasswordApi,
} from "../../utils/api";

export const AUTH_CHECKED = "AUTH_CHECKED";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";

export const SET_USER_REQUEST = "SET_USER_REQUEST";
export const SET_USER_SUCCESS = "SET_USER_SUCCESS";
export const SET_USER_FAILED = "SET_USER_FAILED";

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILED = "LOGIN_USER_FAILED";

export const LOGOUT_USER_REQUEST = "LOGOUT_USER_REQUEST";
export const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS";
export const LOGOUT_USER_FAILED = "LOGOUT_USER_FAILED";

export const ADD_USER_REQUEST = "ADD_USER_REQUEST";
export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export const ADD_USER_FAILED = "ADD_USER_FAILED";

export const UPD_PASSWORD_REQUEST = "UPD_PASSWORD_REQUEST";
export const UPD_PASSWORD_SUCCESS = "UPD_PASSWORD_SUCCESS";
export const UPD_PASSWORD_FAILED = "UPD_PASSWORD_FAILED";

export const RST_PASSWORD_REQUEST = "RST_PASSWORD_REQUEST";
export const RST_PASSWORD_SUCCESS = "RST_PASSWORD_SUCCESS";
export const RST_PASSWORD_FAILED = "RST_PASSWORD_FAILED";

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
export const checkAuth = () => (dispatch) => {
  console.log(getCookie("accessToken"));
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

export const getUser = () => (dispatch) => {
  dispatch({
    type: GET_USER_REQUEST,
  });
  return getUserRequestApi()
    .then((res) => {
      console.log(res);
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

export const setUser = (email, name, password) => (dispatch) => {
  dispatch({
    type: SET_USER_REQUEST,
  });
  //console.log('name', name);
  return setUserRequestApi(email, name, password)
    .then((res) => {
      //console.log(res);
      dispatch({
        type: SET_USER_SUCCESS,
        payload: res.user,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_USER_FAILED,
        payload: err,
      });
    });
};

export const logIn = (email, password) => (dispatch) => {
  dispatch({
    type: LOGIN_USER_REQUEST,
  });
  loginRequestApi({ email, password })
    .then((res) => {
      //console.log("refreshToken", res.refreshToken);
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

export const logOut = (token) => (dispatch) => {
  dispatch({
    type: LOGOUT_USER_REQUEST,
  });
  logOutRequestApi({ token })
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

export const registerUser = (email, password, name) => (dispatch) => {
  dispatch({
    type: ADD_USER_REQUEST,
  });
  createUserApi({ email, password, name })
    .then((res) => {
      //console.log("refreshToken", res.refreshToken);
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

export const updatePassword = (email) => (dispatch) => {
  dispatch({
    type: UPD_PASSWORD_REQUEST,
  });
  updatePasswordApi({ email })
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

export const resetPassword = (password, token) => (dispatch) => {
  dispatch({
    type: RST_PASSWORD_REQUEST,
  });
  resetPasswordApi({ password, token })
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
