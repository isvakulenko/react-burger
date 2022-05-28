import { useState, useEffect, useReducer } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { getIngredients } from "../../utils/api";
import { BurgerIngredientsContext } from "../../contex/burger-ingredients-context";
import { BurgerConstructorContext } from "../../contex/burger-constructor-context";

// Cтейт текущего бургер-конструктора,
//т.е. всё то, что лежит внутри него, тем и наполнен бургер.
const constructorInitialState = {
  bun: null,
  ingredients: [],
  order: [],
};
// Функция reducer отвечает за добавление, удаление ингредиентов
function constructorReducer(state, action) {
  switch (action.type) {
    case "ADD":
      if (action.payload.type === "bun") {
        return {
          ...state,
          bun: action.payload,
          order: [...state.order, action.payload._id],
        };
      }
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
        order: [...state.order, action.payload._id],
      };

    case "DELETE":
      if (action.payload.type === "bun") {
        return {
          ...state,
          bun: null,
          order: state.order.filter((id) => id !== action.payload._id),
        };
      }
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (item) => item._id !== action.payload._id
        ),
        order: state.order.filter((id) => id !== action.payload._id),
      };

    case "RESET":
      return constructorInitialState;

    default:
      return state;
  }
}

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [constructorState, constructorDispatcher] = useReducer(
    constructorReducer,
    constructorInitialState
  );
//Запросим ингредиенты с сервера
  useEffect(() => {
    getIngredients()
      .then((res) => {
        setIngredients(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  // console.log(ingredients);
  // console.log(constructorState);
  return (
    <div className={`${styles.main} pt-10 pb-10`}>
      <AppHeader />
      {constructorState && (
        <div className={styles.wrap}>
          <BurgerConstructorContext.Provider
            value={{ constructorState, constructorDispatcher }}
          >
            <BurgerIngredientsContext.Provider value={ingredients}>
              <BurgerIngredients />
            </BurgerIngredientsContext.Provider>
          </BurgerConstructorContext.Provider>
          <BurgerConstructorContext.Provider
            value={{ constructorState, constructorDispatcher }}
          >
            <BurgerConstructor />
          </BurgerConstructorContext.Provider>
        </div>
      )}
    </div>
  );
}

export default App;
