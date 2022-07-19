import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsType from "../ingredients-type/ingredients-type";
import styles from "./burger-ingredients.module.css";
// import Modal from "../modal/modal";
// import IngredientInfo from "../ingredient-info/ingredient-info";
// import {
//   SET_INGREDIENT_MODAL,
//   RESET_INGREDIENT_MODAL,
// } from "../../services/actions/ingredient-detail";

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  //Вытяним из хранилища
  const ingredients = useSelector((state) => state.ingredients.items);

  // ----------------Блок кода для отслеживания состояния табов--------------
  const [bunRef, inViewBun] = useInView({
    threshold: 0.1,
  });

  const [sauceRef, inViewSauce] = useInView({
    threshold: 0.1,
  });

  const [mainRef, inViewMain] = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (inViewBun) {
      setCurrentTab("bun");
    } else if (inViewSauce) {
      setCurrentTab("sauce");
    } else if (inViewMain) {
      setCurrentTab("main");
    }
  }, [inViewBun, inViewSauce, inViewMain]);
  //---------------------- Конец блока кода для отслеживания табов------------------

  // Cтейт для вкладки табов
  const [current, setCurrentTab] = useState("bun");

  // Cтейт для модалки с деталями ингредиента
  // const [ingredientInModal, setIngredientInModal] = useState(null);
  //const ingredientInModal = useSelector((state) => state.ingredientDetail.info);

  // const onIngredientClick = (ingredient) => {
  //   dispatch({ type: SET_INGREDIENT_MODAL, payload: ingredient });
  // };

  // const closeIngredientModal = () => {
  //   dispatch({ type: RESET_INGREDIENT_MODAL });
  // };

  const onTabClick = (type) => {
    setCurrentTab(type);
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
            // onIngredientClick={onIngredientClick}
            ref={bunRef}
          />
        </div>
        <div id="sauce" className={styles.type}>
          <IngredientsType
            title="Соусы"
            titleId="sauces"
            ingredients={saucesArray}
            // onIngredientClick={onIngredientClick}
            ref={sauceRef}
          />
        </div>
        <div id="main" className={styles.type}>
          <IngredientsType
            title="Начинки"
            titleId="mains"
            ingredients={mainsArray}
            // onIngredientClick={onIngredientClick}
            ref={mainRef}
          />
        </div>
      </div>
      {/* условия открытия модального окна */}
      {/* {ingredientInModal && (
        <Modal onClose={closeIngredientModal}>
          <IngredientInfo ingredientData={ingredientInModal} />
        </Modal>
      )} */}
    </section>
  );
};

export default BurgerIngredients;
