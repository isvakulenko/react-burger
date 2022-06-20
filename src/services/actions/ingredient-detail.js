export const SET_INGREDIENT_MODAL = 'SET_INGREDIENT_MODAL';
export const RESET_INGREDIENT_MODAL = 'RESET_INGREDIENT_MODAL';


export const onIngredientClick = (ingredient) => {
  return  function (dispatch) {
    dispatch({ 
      type: SET_INGREDIENT_MODAL,
      payload: ingredient
    });
  }
};
export const closeIngredientModal  = () => {
  return  { 
    type: RESET_INGREDIENT_MODAL 
  };
};
