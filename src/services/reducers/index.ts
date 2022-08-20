import { combineReducers } from "redux";
import { constructorReducer } from "./constructor";
//import { ingredientDetailReducer } from "./ingredient-detail";
import { ingredientReducer } from "./ingredient";
import { orderReducer } from "./order";
import { userReducer } from "./user";
import { wsReducer } from './ws'

export const rootReducer = combineReducers({
 // ingredientDetail: ingredientDetailReducer,
  burgerConstructor: constructorReducer,
  ingredients: ingredientReducer,
  order: orderReducer,
  user: userReducer,
  ws: wsReducer
});
