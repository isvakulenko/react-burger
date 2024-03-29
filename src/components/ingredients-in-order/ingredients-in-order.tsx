import { FC } from "react";
import styles from "./ingredients-in-order.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {TIngredient} from '../../utils/types/data'

type TIngredientsInOrderProps = {
  ingredient: TIngredient;
  qty: number;
}

export const IngredientsInOrder: FC<TIngredientsInOrderProps> = ({ ingredient, qty }) => {
  return (
    <div className={styles.list}>
      <div className={styles.ingredient_icon}>
        <img
          className={styles.img}
          src={ingredient.image_mobile}
          alt={ingredient.name}
        />
      </div>
      <div className={`${styles.ingredient_info} ml-4`}>
        <p className={`${styles.ingredient_name} text text_type_main-default`}>
          {ingredient.name}
        </p>
        <p
          className={`${styles.ingredient_price} text text_type_digits-default`}
        >
         {`${qty} x ${ingredient.price}`}
          <CurrencyIcon type="primary" />
        </p>
      </div>
    </div>
  );
};
