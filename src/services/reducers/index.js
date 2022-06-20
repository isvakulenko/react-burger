import { combineReducers } from 'redux';

import { constructorReducer } from './constructor';
import { ingredientDetailReducer } from './ingredient-detail';
import { ingredientReducer } from './ingredient';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
  ingredientDetail: ingredientDetailReducer,
  burgerConstructor: constructorReducer,
  ingredients: ingredientReducer,
  order: orderReducer,
});

