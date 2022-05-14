import React from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { getIngredients } from "../../utils/api";

function App() {
  const [ingredients, setIngredients] = React.useState([]);

  React.useEffect(() => {
    getIngredients()
      .then((res) => {
        setIngredients(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  // console.log(ingredients);

  return (
    <div className={`${styles.main} pt-10 pb-10`}>
      <AppHeader />
      <div className={styles.wrap}>
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor ingredientsConstructor={ingredients} />
      </div>
    </div>
  );
}

export default App;
