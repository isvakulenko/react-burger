
import {
  CONSTRUCTOR_SET,
  CONSTRUCTOR_RESET,
  CONSTRUCTOR_DELETE,
  CONSTRUCTOR_REORDER
}
  from '../actions/constructor';

// Cтейт текущего бургер-конструктора,
//т.е. всё то, что лежит внутри него, тем и наполнен бургер.
const initialState = {
  bun: null,
  ingredients: []
};

// Функция reducer отвечает за добавление, удаление ингредиентов
export const constructorReducer = (state = initialState, action) => {
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
      if (action.payload.type === "bun") {
        return {
          ...state,
          bun: null,
        };
      }
      return {
        ...state,
        ingredients: [
          ...state.ingredients.slice(0, action.payload),
          ...state.ingredients.slice(action.payload + 1),
        ]
      };
    case CONSTRUCTOR_REORDER:
      const components = [...state.ingredients];
      components.splice(
        action.payload.stop,
        0,
        components.splice(action.payload.start, 1)[0]
      );
      return {
        ...state,
        ingredients: [...components]
      };
    case CONSTRUCTOR_RESET:
      return initialState;

    default:
      return state;
  }
}
