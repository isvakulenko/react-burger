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
} from  "../constants";

import { TUserActions } from "../actions/user";
import { TUser } from "../../utils/types/data";

export type TUserState = {
  user: TUser | null,
  message: string,
  isAuthChecked: boolean,
  getUserError: string,
  getUserRequest: boolean,
  setUserError: string,
  setUserRequest: boolean,
  isUserChanged: boolean,
  loginUserRequest: boolean,
  loginUserError: string,
  logoutUserRequest: boolean,
  logoutUserError: string,
  addUserRequest: boolean,
  addUserError: string,
  updPasswordRequest: boolean,
  updPasswordError: string,
  rstPasswordRequest: boolean,
  rstPasswordError: string,
}

const initialState: TUserState = {
  user: null,
  message: "",
  isAuthChecked: false,
  getUserError: '',
  getUserRequest: false,
  setUserError: '',
  setUserRequest: false,
  isUserChanged: false,
  loginUserRequest: false,
  loginUserError: '',
  logoutUserRequest: false,
  logoutUserError: '',
  addUserRequest: false,
  addUserError: '',
  updPasswordRequest: false,
  updPasswordError: '',
  rstPasswordRequest: false,
  rstPasswordError: '',
};

export const userReducer = (state = initialState, action:TUserActions
  ): TUserState => {
  switch (action.type) {
    case AUTH_CHECKED: {
      return {
        ...state,
        isAuthChecked: true,
      };
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        getUserRequest: false,
        user: action.payload,
      };
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        getUserError: action.payload,
      };
    }
    case SET_USER_REQUEST: {
      return {
        ...state,
        setUserRequest: true
      };
    }
    case SET_USER_SUCCESS: {
      return {
        ...state,
        setUserRequest: false,
        isUserChanged: true,
        user: action.payload,
      };
    }
    case SET_USER_FAILED: {
      return {
        ...state,
        message: action.payload,
        setUserError: '',
      };
    }
    case LOGIN_USER_REQUEST: {
      return {
        ...state,
        loginUserRequest: true,
      };
    }
    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        loginUserRequest: false,
        user: action.payload,
      };
    }
    case LOGIN_USER_FAILED: {
      return {
        ...state,
        loginUserError: action.payload,
      };
    }
    case LOGOUT_USER_REQUEST: {
      return {
        ...state,
        logoutUserRequest: true,
      };
    }
    case LOGOUT_USER_SUCCESS: {
      return {
        ...state,
        logoutUserRequest: false,
        user: null,
      };
    }
    case LOGOUT_USER_FAILED: {
      return {
        ...state,
        logoutUserError: action.payload,
      };
    }
    case ADD_USER_REQUEST: {
      return {
        ...state,
        addUserRequest: true,
      };
    }
    case ADD_USER_SUCCESS: {
      return {
        ...state,
        addUserRequest: false,
        user: action.payload,
      };
    }
    case ADD_USER_FAILED: {
      return {
        ...state,
        addUserError: action.payload,
      };
    }
    case UPD_PASSWORD_REQUEST: {
      return {
        ...state,
        rstPasswordRequest: true,
      };
    }
    case UPD_PASSWORD_SUCCESS: {
      return {
        ...state,
        rstPasswordRequest: false,
        message: action.payload,
      };
    }
    case UPD_PASSWORD_FAILED: {
      return {
        ...state,
        message: "",
        rstPasswordError: action.payload,
      };
    }
    case RST_PASSWORD_REQUEST: {
      return {
        ...state,
        message: "",
        rstPasswordRequest: true,
      };
    }
    case RST_PASSWORD_SUCCESS: {
      return {
        ...state,
        rstPasswordRequest: false,
        message: action.payload,
      };
    }
    case RST_PASSWORD_FAILED: {
      return {
        ...state,
        message: "",
        rstPasswordError: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
