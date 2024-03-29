import { FC } from "react";
import { TIngredient } from "../../utils/types/data";
import { useRef } from "react";
import { useDispatch } from "../../utils/hooks";
import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  CONSTRUCTOR_REORDER,
  CONSTRUCTOR_DELETE,
} from "../../services/constants";
import styles from "./burger-constructor-component.module.css";

type TIngredientProps = {
  ingredient: TIngredient;
  index: number;
};

const BurgerConstructorComponent: FC<TIngredientProps> = ({
  ingredient,
  index,
}) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLLIElement>(null);

  //--------------------------------------------------------------------------------------------
  // весь useDrop отсюда
  // https://codesandbox.io/s/github/react-dnd/react-dnd/tree/gh-pages/examples_js/04-sortable/simple?from-embed=&file=/src/Card.js:595-1632

  const [{ handlerId }, drop] = useDrop({
    accept: "sort_ingredients",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: { index: number }, monitor) {
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      // - Опциональная цепочка '?.' https://learn.javascript.ru/optional-chaining
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        // hoverBoundingRect! - чтобы не ругался TS на null. Non-null Assertion Operator (Postfix!)
        (hoverBoundingRect!.bottom - hoverBoundingRect!.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset!.y - hoverBoundingRect!.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY! < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY! > hoverMiddleY) {
        return;
      }
      dispatch(
        // reorderConstructor(dragIndex, hoverIndex)
        {
          type: CONSTRUCTOR_REORDER,
          payload: { dragIndex: dragIndex, hoverIndex: hoverIndex },
        }
      );
      item.index = hoverIndex;
    },
  });

  //-------------------------------------------------------------------------------------------

  const [{ isDragging }, drag] = useDrag({
    type: "sort_ingredients",
    item: () => {
      return { ingredient, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  //-----------------------------------------------------------------------------------------
  const opacity = isDragging ? 0 : 1;

  // Join the 2 refs together into one (both draggable and can be dropped on)
  drag(drop(ref));

  return (
    <li
      className={`${styles.item} mt-4 mb-4`}
      style={{ opacity }}
      data-handler-id={handlerId}
      ref={ref}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={false}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() =>
          dispatch({
            type: CONSTRUCTOR_DELETE,
            payload: index,
          })
        }
      />
    </li>
  );
};

export default BurgerConstructorComponent;
