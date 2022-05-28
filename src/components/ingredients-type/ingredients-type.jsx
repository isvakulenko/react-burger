import Ingredient from "../ingredient/ingredient";
import styles from "./ingredients-type.module.css";
import PropTypes from "prop-types";
import { IngredientPropTypes } from "../../utils/prop-types";

const IngredientsType = ({
  title,
  titleId,
  ingredients,
  onIngredientClick,
}) => {
  return (
    <>
      <h2 className="text text_type_main-medium mt-10" id={titleId}>
        {title}
      </h2>
      <div className={styles.type}>
        {ingredients.map((ingredient) => {
          return (
            <Ingredient
              ingredientData={ingredient}
              key={ingredient._id}
              count={1}
              onClick={onIngredientClick}
            />
          );
        })}
      </div>
    </>
  );
};

IngredientsType.propTypes = {
  title: PropTypes.string.isRequired,
  titleId: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(IngredientPropTypes.isRequired).isRequired,
  onIngredientClick: PropTypes.func.isRequired,
};
export default IngredientsType;
