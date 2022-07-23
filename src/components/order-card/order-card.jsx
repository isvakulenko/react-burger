import styles from "./order-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
export const OrderCard = ({ order }) => {
  //Возьмем из объекта заказа необходимые данные
  const { number, name, createdAt, _id } = order;
  const location = useLocation();
  //Данные по всем ингредиентам
  const ingredients = useSelector((store) => store.ingredients.items);
  //console.log(createdAt)
  console.log(order);
  //Для правильного отображения данных как в макете,
  // их необходимо привести к соответствующему виду
  // 2022-07-21T18:07:01.492Z
  // Отформатируем дату
  // const formatTime = (date) => {
  // return date.split('T')
  // };
  // console.log (formatTime ('2022-07-21T18:07:01.492Z') )

  // Сегодня, 16:20 i-GMT+3

  //Подготовим массив с данными для формирования ленты заказа
  const ingredientsList = order.ingredients.reduce((arrFeed, itemId) =>
    //найдем в общем массиве ингредиентов ингредиенты из пришедшего заказа
    {
      const ingredient = ingredients.find((item) => item._id === itemId);
      if (ingredient) arrFeed.push(ingredient);
      return arrFeed;
    }, []);

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
          pathname: `/feed/${_id}`,
          state: { background: location },
        }}
      >
        <div className={styles.orderID}>
          <span className="text text_type_main-medium">{`#${number}`}</span>
          <span className="text text_type_main-medium text_color_inactive">
            {Date.now()}
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
