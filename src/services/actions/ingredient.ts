import { getIngredientsApi } from "../../utils/api";
import { AppThunk } from "../../utils/types";

import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
} from "../constants";

import { TIngredient } from "../../utils/types/data";

export type TGetIngredientRequestAction = {
  readonly type: typeof GET_ITEMS_REQUEST;
};

export type TGetIngredientSuccessAction = {
  readonly type: typeof GET_ITEMS_SUCCESS;
  readonly items: ReadonlyArray<TIngredient>;
};
export type TGetIngredientFailedAction = {
  readonly type: typeof GET_ITEMS_FAILED;
  readonly message: string;
};

export type TGetIngredientActions =
  | TGetIngredientRequestAction
  | TGetIngredientSuccessAction
  | TGetIngredientFailedAction;

//Делаем запрос к API и получаем  данные с ингредиентами
export const getItems = (): AppThunk => (dispatch) => {
  dispatch({
    type: GET_ITEMS_REQUEST,
  });
  getIngredientsApi()
    .then((res) => {
      dispatch({
        type: GET_ITEMS_SUCCESS,
        items: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ITEMS_FAILED,
        message: err.message,
      });
    });
};
