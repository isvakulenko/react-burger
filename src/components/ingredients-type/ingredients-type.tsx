import React, { useMemo } from "react";
import Ingredient from "../ingredient/ingredient";
import { useSelector } from "../../utils/hooks";
import styles from "./ingredients-type.module.css";
import { TIngredient } from "../../utils/types/data";

type TIngredientTypeProps = {
  ingredients: TIngredient[];
  title: string;
  titleId: string;
};
type TComponentsCount = {
  [name: string]: number;
};

const IngredientsType = React.forwardRef<HTMLDivElement, TIngredientTypeProps>(
  ({ title, titleId, ingredients }, ref) => {
    // Посчитаем сколько каждого элемента используется в готовом бургере
    //Получим список элементов в конструкторе
    const burgerConstructor = useSelector((state) => state.burgerConstructor);
    const componentsCount = useMemo(() => {
      const { bun, ingredients } = burgerConstructor;
      const counters: TComponentsCount = {};
      ingredients.forEach((ingredient) => {
        if (!counters[ingredient._id]) counters[ingredient._id] = 0;
        counters[ingredient._id] = counters[ingredient._id] + 1;
      });
      if (bun) counters[bun._id] = 2;
      return counters;
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
              />
            );
          })}
        </div>
      </>
    );
  }
);

export default IngredientsType;
