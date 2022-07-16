import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";
import { IngredientPropTypes } from "../../utils/prop-types";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onIngredientClick } from "../../services/actions/ingredient-detail";

const Ingredient = ({
  ingredientData,
  count,
  //  onClick
}) => {
  const { image, price, name, _id } = ingredientData;

  const dispatch = useDispatch();

  const handleClickIngredient = () => {
    dispatch(onIngredientClick(ingredientData));
  };

  const [, dragRef] = useDrag({
    type: "add_ingredient",
    item: ingredientData,
  });
  const location = useLocation();
  return (
    <Link
      to={{
        pathname: `/ingredients/${_id}`,
        state: { background: location },
      }}
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
    </Link>
  );
};

Ingredient.propTypes = {
  ingredientData: IngredientPropTypes.isRequired,
  // onClick: PropTypes.func.isRequired,
};

export default Ingredient;
