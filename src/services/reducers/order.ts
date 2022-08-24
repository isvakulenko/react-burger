import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  RESET_ORDER
} from '../constants'

import { TCreateOrderActions } from '../actions/order';
type TNewOrderResponse = {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
} 
export type TCreateOrderState = {
  data: TNewOrderResponse | null;
  isLoading: boolean;
}


const initialState: TCreateOrderState = {
  data: null,
  isLoading: false
}

export const orderReducer = (state = initialState, action:TCreateOrderActions 
): TCreateOrderState => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      {
        return {
          ...state,
          isLoading: true
        };
      }
    case CREATE_ORDER_SUCCESS:
      {
        return {
          ...state,
          data: action.payload,
          isLoading: false
        };
      }
    case CREATE_ORDER_FAILED:
      {
        return {
          ...state,
          isLoading: false
        };
      }
    case RESET_ORDER:
      {
        return {
          ...state,
          data: null,
          isLoading: false
        };
      }
    default:
      return state;
  }
}