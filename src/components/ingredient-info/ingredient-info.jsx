import { IngredientPropTypes } from "../../utils/prop-types";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./ingredient-info.module.css";

const IngredientInfo = () => {
  const { id } = useParams();
  //Вытяним из хранилища ингредиентов
  const ingredients = useSelector((state) => state.ingredients.items);
  // console.log ("ingredients", ingredients)
  //И найдем неодходимый компонент для отображения
  const ingredient = ingredients.find((ingredient) => ingredient._id === id);

  // console.log ("ingredient", ingredient);

  return (
    <>
      {!ingredient && (
        <p className="text text_type_main-medium">Загружаем...</p>
      )}

      {ingredient && (
        <section className={`${styles.section} pt-10 pb-15 `}>
          <h2 className={`${styles.title} text text_type_main-large`}>
            Детали ингредиента
          </h2>
          <img
            src={`${ingredient.image_large}`}
            alt={ingredient.name}
            className={`${styles.image} pl-5 pr-5`}
          />
          <p className="text text_type_main-medium pt-4">{ingredient.name}</p>
          <ul className={`${styles.list} pt-8`}>
            <li
              className={`${styles.item} text text_type_digits-default text_color_inactive`}
            >
              <span className="text_type_main-default">Калории,ккал</span>
              {ingredient.calories}
            </li>
            <li
              className={`${styles.item} text text_type_digits-default text_color_inactive`}
            >
              <span className="text_type_main-default">Белки, г</span>
              {ingredient.proteins}
            </li>
            <li
              className={`${styles.item} text text_type_digits-default text_color_inactive`}
            >
              <span className="text_type_main-default">Жиры, г</span>
              {ingredient.fat}
            </li>
            <li
              className={`${styles.item} text text_type_digits-default text_color_inactive`}
            >
              <span className="text_type_main-default">Углеводы, г</span>
              {ingredient.carbohydrates}
            </li>
          </ul>
        </section>
      )}
    </>
  );
};

export default IngredientInfo;
