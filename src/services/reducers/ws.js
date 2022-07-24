import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CONNECTION_WITH_TOKEN,
} from "../actions/ws";

const initialState = {
  orders: null,
  total: 0,
  totalToday: 0,
  wsOpen: false,
  wsRequest: false,
  wsFailed: false
};

export const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_START: {
      return {
        ...state,
        wsRequest: true,
        wsFailed: false,
        wsOpen: false,
      };
    }
    case WS_CONNECTION_WITH_TOKEN: {
      return {
        ...state,
        wsRequest: true,
        wsFailed: false,
        wsOpen: false,
      };
    }
    case WS_CONNECTION_CLOSE: {
      return {
        ...state,
        orders: null,
        total: 0,
        totalToday: 0,
        wsOpen: false,
        wsRequest: false,
        wsFailed: false
      };
    }
    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsOpen: true,
        wsRequest: false,
        wsFailed: false
      };
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        wsOpen: false,
        wsRequest: false,
        wsFailed: true
      };
    }
    case WS_GET_MESSAGE: {
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    }
    case WS_CONNECTION_CLOSED: {
      return {
        ...state,
        orders: null,
        total: 0,
        totalToday: 0,
        wsOpen: false,
        wsRequest: false,
        wsFailed: false
      };
    }
    default: {
      return state;
    }
  }
};