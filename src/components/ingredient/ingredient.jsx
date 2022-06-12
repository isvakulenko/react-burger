import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";
import PropTypes from "prop-types";
import { IngredientPropTypes } from "../../utils/prop-types";
import { useDrag } from "react-dnd";

const Ingredient = ({ ingredientData, count, onClick }) => {
  const { image, price, name } = ingredientData;

  //При нажатии на ингредиент его данные передаются в модалку
  const handleClickIngredient = () => {
    onClick(ingredientData);
  };

  const [, dragRef] = useDrag({
    type: "add_ingredient",
    item: ingredientData,
  });

  return (
    <article
      className={`${styles.card} mt-6`}
      onClick={handleClickIngredient}
      ref={dragRef}
      draggable
    >
      {count && <Counter count={count} />}
      <img className={styles.img} src={image} alt={name} />
      <div className={`${styles.cost} mt-1 mb-1 `}>
        <p className="text text_type_digits-default">{price}</p>
        <CurrencyIcon />
      </div>
      <p className={`${styles.name} text text_type_main-default`}>{name}</p>
    </article>
  );
};

Ingredient.propTypes = {
  ingredientData: IngredientPropTypes.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Ingredient;
