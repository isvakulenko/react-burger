import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsType from "../ingredients-type/ingredients-type";
import styles from "./burger-ingredients.module.css";

const BurgerIngredients = ({ ingredients }) => {
  const [current, setCurrent] = React.useState("Булки");
  const onTabClick = (type) => {
    setCurrent(type);
  };
// Получим массивы для дальнейшей подстановки в IngredientsType
  const buns = ingredients.filter((item) => item.type === "bun");
  const sauces = ingredients.filter((item) => item.type === "sauce");
  const mains = ingredients.filter((item) => item.type === "main");

  return (
    <section>
      <h1 className="mt-10 mb-5 text text_type_main-large">Соберите бургер</h1>
      <div style={{ display: "flex" }}>
        <Tab value="Булки"
         active={current === "Булки"} 
         onClick={onTabClick}>
          Булки
        </Tab>
        <Tab value="Соусы"
         active={current === "Соусы"}
         onClick={onTabClick}>
          Соусы
        </Tab>
        <Tab
          value="Начинки"
          active={current === "Начинки"}
          onClick={onTabClick}
        >
          Начинки
        </Tab>
      </div>

      <div className={styles.content}>
        <div className={styles.type}>
          <IngredientsType title="Булки" titleId="buns" ingredients={buns} />
        </div>
        <div className={styles.type}>
          <IngredientsType
            title="Соусы"
            titleId="sauces"
            ingredients={sauces}
          />
        </div>
        <div className={styles.type}>
          <IngredientsType
            title="Начинки"
            titleId="mains"
            ingredients={mains}
          />
        </div>
      </div>
    </section>
  );
};

export default BurgerIngredients;
