import {
  CONSTRUCTOR_SET,
  CONSTRUCTOR_RESET,
  CONSTRUCTOR_DELETE,
  CONSTRUCTOR_REORDER,
} from "../constants";
import { TIngredient, TConstructorlngredient } from "../../utils/types/data";
import { TConstructorActions } from "../actions/constructor";

export type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorlngredient[];
};

// Cтейт текущего бургер-конструктора,
//т.е. всё то, что лежит внутри него, тем и наполнен бургер.
const initialState: TConstructorState = {
  bun: null,
  ingredients: [],
};

// Функция reducer отвечает за добавление, удаление ингредиентов
export const constructorReducer = (
  state = initialState,
  action: TConstructorActions
): TConstructorState => {
  switch (action.type) {
    case CONSTRUCTOR_SET:
      if (action.payload.type === "bun") {
        return {
          ...state,
          bun: action.payload,
        };
      }
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case CONSTRUCTOR_DELETE:
      // Булки не удаляются, а заменяются
      // if (action.payload.type === "bun") {
      //   return {
      //     ...state,
      //     bun: null,
      //   };
      // }
      return {
        ...state,
        ingredients: [
          ...state.ingredients.slice(0, action.payload),
          ...state.ingredients.slice(action.payload + 1),
        ],
      };
    case CONSTRUCTOR_REORDER:
      const components = [...state.ingredients];
      components.splice(
        action.payload.hoverIndex,
        0,
        components.splice(action.payload.dragIndex, 1)[0]
      );
      return {
        ...state,
        ingredients: [...components],
      };
    case CONSTRUCTOR_RESET:
      return initialState;

    default:
      return state;
  }
};
