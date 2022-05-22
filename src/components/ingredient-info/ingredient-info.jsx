import { IngredientPropTypes } from "../../utils/prop-types";
import styles from "./ingredient-info.module.css";

const IngredientInfo = ({ ingredientData }) => {
  return (
    <section className={`${styles.section} pt-10 pb-15 `}>
      <h2 className={`${styles.title} text text_type_main-large`}>
        Детали ингредиента
      </h2>
      <img
        src={`${ingredientData.image_large}`}
        alt={ingredientData.name}
        className={`${styles.image} pl-5 pr-5`}
      />
      <p className="text text_type_main-medium pt-4">{ingredientData.name}</p>
      <ul className={`${styles.list} pt-8`}>
        <li
          className={`${styles.item} text text_type_digits-default text_color_inactive`}
        >
          <span className="text_type_main-default">Калории,ккал</span>
          {ingredientData.calories}
        </li>
        <li
          className={`${styles.item} text text_type_digits-default text_color_inactive`}
        >
          <span className="text_type_main-default">Белки, г</span>
          {ingredientData.proteins}
        </li>
        <li
          className={`${styles.item} text text_type_digits-default text_color_inactive`}
        >
          <span className="text_type_main-default">Жиры, г</span>
          {ingredientData.fat}
        </li>
        <li
          className={`${styles.item} text text_type_digits-default text_color_inactive`}
        >
          <span className="text_type_main-default">Углеводы, г</span>
          {ingredientData.carbohydrates}
        </li>
      </ul>
    </section>
  );
};

IngredientInfo.propTypes = {
  ingredientData: IngredientPropTypes.isRequired,
};
export default IngredientInfo;
