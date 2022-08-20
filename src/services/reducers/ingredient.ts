import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
} from '../constants'

import { TGetIngredientActions } from "../actions/ingredient";
import { TIngredient } from '../../utils/types/data';

export type TGetIngredientsState = {
  items: ReadonlyArray<TIngredient>,
  itemsRequest: boolean,
  itemsFailed: boolean,
}

const initialState :TGetIngredientsState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
};

export const ingredientReducer = (state = initialState, action: TGetIngredientActions
  ):TGetIngredientsState => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        itemsRequest: true
      };
    }
    case GET_ITEMS_SUCCESS: {
      return { ...state, itemsFailed: false, items: action.items, itemsRequest: false };
    }
    case GET_ITEMS_FAILED: {
      return { ...state, itemsFailed: true, itemsRequest: false };
    }
    default: {
      return state;
    }
  }
}
