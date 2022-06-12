
export const CONSTRUCTOR_SET = 'CONSTRUCTOR_SET';
export const CONSTRUCTOR_RESET = 'CONSTRUCTOR_RESET';
export const CONSTRUCTOR_DELETE = 'CONSTRUCTOR_DELETE';
export const CONSTRUCTOR_REORDER = 'CONSTRUCTOR_REORDER';


export const addToConstructor = (ingredient) => {
  return function (dispatch) {
    dispatch({
      type: CONSTRUCTOR_SET,
      payload: {
        ...ingredient,
        id: Math.random().toString(36).slice(2)
      }
    });
  }
}