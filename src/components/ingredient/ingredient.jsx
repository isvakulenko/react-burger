import React from "react";
import PropTypes from "prop-types";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";
import { IngredientPropTypes } from "../../utils/prop-types";

const Ingredient = ({ ingredientData, count, onClick }) => {
  const { image, price, name } = ingredientData;
  const handleClick = () => {
    onClick(ingredientData);
  };

  return (
    <div className={`${styles.card} mt-6`} onClick={handleClick}>
      <Counter count={count} />
      <img className={styles.img} src={image} alt={name} />
      <div className={`${styles.cost} mt-1 mb-1 `}>
        <p className="text text_type_digits-default">{price}</p>
        <CurrencyIcon />
      </div>
      <p className="text text_type_main-default">{name}</p>
    </div>
  );
};

Ingredient.propTypes = {
  ingredientData: IngredientPropTypes.isRequired,
  count: PropTypes.number,
  //onClick: PropTypes.func.isRequired,
};

export default Ingredient;
