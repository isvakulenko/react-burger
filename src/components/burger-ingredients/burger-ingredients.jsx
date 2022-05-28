import React, { useState, useContext } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsType from "../ingredients-type/ingredients-type";
import styles from "./burger-ingredients.module.css";
import Modal from "../modal/modal";
import IngredientInfo from "../ingredient-info/ingredient-info";
import { BurgerIngredientsContext } from "../../contex/burger-ingredients-context";

const BurgerIngredients = () => {
  const ingredients = useContext(BurgerIngredientsContext);

 // Cтейт для вкладки табов
  const [current, setCurrent] = React.useState("bun");

  // Cтейт для модалки с деталями ингредиента
  const [ingredientInModal, setIngredientInModal] = useState(null);

  const closeIngredientModal = () => setIngredientInModal(null);

  const onTabClick = (type) => {
    setCurrent(type);
    const tabElement = document.getElementById(type);
    tabElement.scrollIntoView({ behavior: "smooth" });
  };

  // Получим массивы для дальнейшей подстановки в IngredientsType
  const bunsArray = ingredients.filter((item) => item.type === "bun");
  const saucesArray = ingredients.filter((item) => item.type === "sauce");
  const mainsArray = ingredients.filter((item) => item.type === "main");

  return (
    <section className={styles.menu}>
      <h1 className="mt-10 mb-5 text text_type_main-large">Соберите бургер</h1>
      <div style={{ display: "flex" }}>
        <Tab value="bun" active={current === "bun"} onClick={onTabClick}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={onTabClick}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={onTabClick}>
          Начинки
        </Tab>
      </div>

      <div className={styles.content}>
        <div id="bun" className={styles.type}>
          <IngredientsType
            title="Булки"
            titleId="buns"
            ingredients={bunsArray}
            onIngredientClick={setIngredientInModal}
          />
        </div>
        <div id="sauce" className={styles.type}>
          <IngredientsType
            title="Соусы"
            titleId="sauces"
            ingredients={saucesArray}
            onIngredientClick={setIngredientInModal}
          />
        </div>
        <div id="main" className={styles.type}>
          <IngredientsType
            title="Начинки"
            titleId="mains"
            ingredients={mainsArray}
            onIngredientClick={setIngredientInModal}
          />
        </div>
      </div>
      {/* условия открытия модального окна */}
      {ingredientInModal && (
        <Modal onClose={closeIngredientModal}>
          <IngredientInfo ingredientData={ingredientInModal} />
        </Modal>
      )}
    </section>
  );
};


export default BurgerIngredients;
