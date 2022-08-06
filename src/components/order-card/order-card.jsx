import styles from "./order-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import formatTime from "../../utils/utils";

export const OrderCard = ({ order }) => {
  //Возьмем из объекта заказа необходимые данные
  const { number, name, createdAt, _id } = order;
  const location = useLocation();
  // Используем значение url для открывания модальных окон в ленте и в истории заказов
  const {url} = useRouteMatch()
  //Данные по всем ингредиентам
  const ingredients = useSelector((store) => store.ingredients.items);
  //console.log(createdAt)
  //console.log(order);


  //Подготовим массив с данными для формирования ленты заказа
  const ingredientsList = order.ingredients.reduce((arrFeed, itemId) =>
    //найдем в общем массиве ингредиентов ингредиенты из пришедшего заказа
    {
      const ingredient = ingredients.find((item) => item._id === itemId);
      if (ingredient) arrFeed.push(ingredient);
      return arrFeed;
    }, []);
  //Итоговая сумма заказа
  const total = ingredientsList.reduce((sum, current) => {
    return sum + current.price;
  }, 0);

  //ingredients.find(ingredient => ingredient._id === _id)

  //console.log(ingredientsList);
  // console.log(total)
  return (
    <li className={styles.list_order_info}>
      <Link
        className={styles.list_order_link}
        to={{
          pathname: `${url}/${_id}`,
          state: { background: location,
          from: location.pathname 
        }
      }}
      >
        <div className={styles.orderID}>
          <span className="text text_type_main-medium">{`#${number}`}</span>
          <span className="text text_type_main-medium text_color_inactive">
            {formatTime(createdAt)}
          </span>
        </div>
        <h2 className={`${styles.order_name} text text_type_main-medium`}>
          {name}
        </h2>
        <div className={styles.components_line}>
          <ul className={styles.components_list}>
            {/* Обрежем через slice массив, чтобы в нем было не более 6 ингредиентов */}
            {ingredientsList.slice(0, 5).map((ingredient, index) => {
              return (
                <li
                  key={index}
                  className={styles.components__list_item}
                  style={{ zIndex: `${ingredientsList.length - index}` }}
                >
                  <div className={styles.ingredientIcon}>
                    <img
                      className={styles.img}
                      src={ingredient.image_mobile}
                      alt={ingredient.name}
                    />
                  </div>
                </li>
              );
            })}
            {/* Если компонентов более 6, отобразим сколько еще осталось */}
            {ingredientsList.length > 5 && (
              <li
                className={styles.components__list_item_plus}
                style={{ zIndex: `${ingredientsList.length - 6}` }}
              >
                <div className={styles.components__plusCounter}>
                  <p className="text text_type_digits-default">{`+${
                    ingredientsList.length - 5
                  }`}</p>
                </div>
                <div className={styles.ingredientIcon}>
                  <img
                    className={styles.img}
                    src={
                      ingredientsList[ingredientsList.length - 1].image_mobile
                    }
                    alt={ingredientsList[ingredientsList.length - 1].name}
                  />
                </div>
              </li>
            )}
          </ul>
          <div className={styles.components_price}>
            <p className="text text_type_digits-default"> {total} </p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </Link>
    </li>
  );
};
