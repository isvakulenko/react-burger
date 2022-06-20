import React, {useMemo}  from 'react';
import Ingredient from "../ingredient/ingredient";
import { useSelector } from 'react-redux';
import styles from "./ingredients-type.module.css";
import PropTypes from "prop-types";
import { IngredientPropTypes } from "../../utils/prop-types";

const IngredientsType = React.forwardRef(({
  title,
  titleId,
  ingredients,
  onIngredientClick
}, ref) => {

 // Посчитаем сколько каждого элемента используется в готовом бургере
//Получим список элементов в конструкторе
const burgerConstructor = useSelector(state => state.burgerConstructor)
const componentsCount = useMemo(() => {
  const { bun, ingredients } = burgerConstructor;
  const counters = {};
  ingredients.forEach((ingredient) => {
    if (!counters[ingredient._id]) counters[ingredient._id] = 0;
    counters[ingredient._id] = counters[ingredient._id] + 1;
  });
  if (bun) counters[bun._id] = 2;
  return counters
}, [burgerConstructor]);

  return (
    <>
      <h2 className="text text_type_main-medium mt-10" id={titleId}>
        {title}
      </h2>
      <div className={styles.type} ref={ref}>
        {ingredients.map((ingredient) => {
          return (
            <Ingredient
              ingredientData={ingredient}
              key={ingredient._id}
              count={componentsCount[ingredient._id]}
              onClick={onIngredientClick}
            />
          );
        })}
      </div>
    </>
  );
});

IngredientsType.propTypes = {
  title: PropTypes.string.isRequired,
  titleId: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(IngredientPropTypes.isRequired).isRequired,
  onIngredientClick: PropTypes.func.isRequired,
};
export default IngredientsType;
