import { useSelector } from "../../utils/hooks";
import { useParams } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientsInOrder } from "../ingredients-in-order/ingredients-in-order";
import styles from "./order-info.module.css";
import formatTime from "../../utils/utils";
import { TIngredient } from "../../utils/types/data";

export const OrderInfo = () => {
  const { id } = useParams<{ id: string }>();
  const { orders } = useSelector((store) => store.ws);

  //Данные по всем ингредиентам
  const ingredients = useSelector((store) => store.ingredients.items);
  //console.log(ingredients);
  // Найдем из всего стейта заказов, тот, по которому кликнули
  const order = orders!.find((order) => order._id === id);
  // Соберем массив с данными, которые входят в заказ
  const ingredientsList = order!.ingredients.reduce(
    (acc: TIngredient[], ingId) =>
      //найдем в общем массиве ингредиентов ингредиенты кликнутого заказаа
      {
        const ingredient = ingredients.find((item) => item._id === ingId);
        if (ingredient) acc.push(ingredient);
        return acc;
      },
    []
  );
  //Посчитаем сколько каждого ингредиента в заказе
  const quantityIngredients = ingredientsList.reduce(function (
    prevVal: { [key: string]: number },
    item
  ) {
    if (!prevVal[item._id]) {
      // если ключа ещё нет в объекте, значит это первое повторение
      prevVal[item._id] = 1;
    } else {
      // иначе увеличим количество повторений на 1
      prevVal[item._id] += 1;
    }
    // и вернём изменённый объект
    return prevVal;
  },
  {}); // Начальное значение — пустой объект.

  // Создадим массив только из уникальных ингредиентов
  const ingredientsListUniq = Array.from(new Set(ingredientsList));

  let status = "";
  switch (order!.status) {
    case "created":
      status = "Создан";
      break;
    case "pending":
      status = "Готовится";
      break;
    case "done":
      status = "Выполнен";
      break;
    default:
      break;
  }

  //Итоговая сумма заказа
  const total = ingredientsList.reduce((sum, current) => {
    return sum + current.price;
  }, 0);
  // console.log(order);
  // console.log(ingredientsList);
  return (
    <>
      {!order && (
        <p className="text text_type_main-medium">
          Загружаем информацию о заказе...
        </p>
      )}
      {order && (
        <section className={styles.main}>
          <p
            className={`${styles.number} text text_type_main-medium`}
          >{`#${order.number}`}</p>
          <h2 className="text text_type_main-medium">{order.name} </h2>
          <span
            className="text text_type_main-default mb-15"
            style={
              status === "Выполнен"
                ? { color: "#00CCCC" }
                : { color: "#F2F2F3" }
            }
          >
            {status}
          </span>
          <p className="text text_type_main-medium mb-6">Состав</p>
          <ul className={styles.ingredients_list}>
            {ingredientsListUniq.map((element) => {
              return (
                <li key={element._id}>
                  <IngredientsInOrder
                    ingredient={element}
                    qty={quantityIngredients[element._id]}
                  />
                </li>
              );
            })}
          </ul>
          <div className={styles.footer}>
            <span className="text text_type_main-medium text_color_inactive">
              {formatTime(order.createdAt)}
            </span>
            <div className={styles.components_price}>
              <p className="text text_type_digits-default"> {total} </p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default OrderInfo;
