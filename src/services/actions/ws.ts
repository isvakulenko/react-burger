// export const WS_CONNECTION_START = 'WS_CONNECTION_START';
// export const WS_CONNECTION_CLOSE = 'WS_CONNECTION_CLOSE';
// export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
// export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
// export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
// export const WS_GET_MESSAGE = 'WS_GET_MESSAGE';
// export const WS_CONNECTION_WITH_TOKEN = 'WS_CONECTION_WITH_TOKEN';

import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CONNECTION_WITH_TOKEN
} from "../constants";

import { TOrder } from "../../utils/types/data";

export type TwsOrder = {
  success: boolean;
  orders: ReadonlyArray<TOrder>;
  total: number;
  totalToday: number;
};

export type TWsInitAction = {
  readonly type: typeof WS_CONNECTION_START;
};
export type TWsConnectionSuccessAction = {
  readonly type: typeof WS_CONNECTION_SUCCESS;
};
export type TWsConnectionCloseAction = {
  readonly type: typeof WS_CONNECTION_CLOSE;
};
export type TWsConnectionErrorAction = {
  readonly type: typeof WS_CONNECTION_ERROR;
};
export type TWsOnCloseAction = {
  readonly type: typeof WS_CONNECTION_CLOSED;
};
export type TWGetMessageAction = {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: TwsOrder
};
export type TWsInitWithTokenAction = {
  readonly type: typeof WS_CONNECTION_WITH_TOKEN;
  readonly payload: string;

};

export type TWsActions = 
  // wsInit: typeof WS_CONNECTION_START;
  // onOpen: typeof WS_CONNECTION_SUCCESS;
  // wsClose: typeof WS_CONNECTION_CLOSE;
  // onError: typeof WS_CONNECTION_ERROR;
  // onClose: typeof WS_CONNECTION_CLOSED;
  // onMessage: typeof WS_GET_MESSAGE;
  // wsInitWithToken: typeof WS_CONNECTION_WITH_TOKEN;
    
    TWsInitAction
  | TWsConnectionSuccessAction
  | TWsConnectionCloseAction 
  | TWsConnectionErrorAction
  | TWsOnCloseAction
  | TWGetMessageAction
  | TWsInitWithTokenAction
;



export const wsInit = ():TWsInitAction => {
  console.log ('wsInit')
  return {
        type: WS_CONNECTION_START
  };
};
export const wsConnectionSuccess = (): TWsConnectionSuccessAction => {
  return {
    type: WS_CONNECTION_SUCCESS
  };
};
export const wsConnectionClosed = ():TWsOnCloseAction => {
  return {
    type: WS_CONNECTION_CLOSED
  };
};
export const wsConnectionError = (): TWsConnectionErrorAction => {
  return {
    type: WS_CONNECTION_ERROR
  };
};
export const wsClose = ():TWsConnectionCloseAction => {
  return {
    type: WS_CONNECTION_CLOSE
  };
};
export const wsGetMessage = (res: TwsOrder):TWGetMessageAction => {
  return {
    type: WS_GET_MESSAGE,
    payload: res
  };
};



export const wsInitWithToken = (url: string): TWsInitWithTokenAction => {
  console.log ('wsInitWithToken')
  return {
        type: WS_CONNECTION_WITH_TOKEN,
        payload: url,
  };
};



export type TWsFunctionsActions = {
  wsInit: typeof WS_CONNECTION_START;
  onOpen: typeof WS_CONNECTION_SUCCESS;
  wsClose: typeof WS_CONNECTION_CLOSE;
  onError: typeof WS_CONNECTION_ERROR;
  onClose: typeof WS_CONNECTION_CLOSED;
  onMessage: typeof WS_GET_MESSAGE;
  wsInitWithToken: typeof WS_CONNECTION_WITH_TOKEN;
}

export const wsActions: TWsFunctionsActions = {
  wsInit: WS_CONNECTION_START,
  wsClose: WS_CONNECTION_CLOSE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
  wsInitWithToken: WS_CONNECTION_WITH_TOKEN
};