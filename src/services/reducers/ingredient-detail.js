import {
  SET_INGREDIENT_MODAL,
  RESET_INGREDIENT_MODAL
} from '../actions/ingredient-detail'

const initialState = {
info: null,
}
export const ingredientDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENT_MODAL: {
      return {
        ...state,
        info: action.payload
      }
    }
    case RESET_INGREDIENT_MODAL: {
      return initialState
    }
    default: {
      return state
    }
  }
}