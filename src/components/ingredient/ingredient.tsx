import { FC } from "react";
import { TIngredient } from "../../utils/types/data";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";


type TIngredientProps = {
  ingredientData : TIngredient;
  count: number
}

const Ingredient: FC<TIngredientProps> = ({ ingredientData, count }) => {
  const { image, price, name, _id } = ingredientData;

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
      ref={dragRef}
      draggable
    >
      {count && <Counter count={count} />}
      <img className={styles.img} src={image} alt={name} />
      <div className={`${styles.cost} mt-1 mb-1 `}>
        <p className="text text_type_digits-default">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_type_main-default`}>{name}</p>
    </Link>
  );
};


export default Ingredient;
