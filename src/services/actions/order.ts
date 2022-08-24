import { orderBurgerApi} from '../../utils/api';
import {  AppThunk } from '../../utils/types';

import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  RESET_ORDER
}
from '../constants';
type TNewOrderResponse = {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
} 

export type TCreateOrderRequestAction = {
  readonly type: typeof CREATE_ORDER_REQUEST;
};
export type TCreateOrderRequestSuccessAction = {
  readonly type: typeof CREATE_ORDER_SUCCESS;
  readonly payload: TNewOrderResponse;
};
export type TCreateOrderRequestFailedAction = {
  readonly type: typeof CREATE_ORDER_FAILED;
  readonly message: string;
};

export type TCreateOrderResetAction = {
  readonly type: typeof RESET_ORDER;
};
export type TCreateOrderActions = 
 TCreateOrderRequestAction
| TCreateOrderRequestSuccessAction
| TCreateOrderRequestFailedAction
| TCreateOrderResetAction ;


export const orderBurger = (orderData: string[]):AppThunk<Promise<unknown>> => (dispatch) => {
  // Заметь также, что здесь не указывается тип у dispatch.
  // Почему? Потому что мы уже типизировали внешнюю функцию,
  // и TS автоматически выведет тип dispatch, что позволяет
  // нам не писать вручную (dispatch: AppDispatch) => .... 
  // Это часть магии TS: написали типизацию снаружи, а внутри
  // всё само подцепляется.
  
  dispatch({
    type: CREATE_ORDER_REQUEST,
  });
  return orderBurgerApi(orderData)
    .then((res) => {
      console.log(res);
      dispatch({
        type: CREATE_ORDER_SUCCESS,
              payload: res,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: CREATE_ORDER_FAILED,
        message: err.message,
      });
    });
};
