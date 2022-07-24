import { useSelector } from "react-redux";
import styles from "./order-stat.module.css";

export const OrderStat = () => {
  const { orders, total, totalToday } = useSelector((store) => store.ws);
  // Найдем заказы, которые еще готовятся
  const pendingOrder = orders
    .filter((item) => {
      return item.status === "pending";
    })
    .map((order) => {
      return order.number;
    });
  // Найдем готовые заказы
  const doneOrder = orders
    .filter((item) => {
      return item.status === "done";
    })
    .map((order) => {
      return order.number;
    });

  return (
    <div className={styles.main}>
      <div className={styles.orders_stats}>
        {/* Для готовых заказов */}
        <div className={styles.orders_stats_numbers}>
          <p className="text text_type_main-medium mb-6">Готовы</p>
          <ul className={styles.orders_stats_list}>
            {doneOrder.map((order, index) => {
              return (
                <li key={index}>
                  <p className="text text_type_digits-default">{order}</p>
                </li>
              );
            })}
          </ul>
        </div>
        {/* Для еще выполняющихся заказов */}
        <div className={styles.orders_stats_numbers}>
          <p className="text text_type_main-medium mb-6">В работе</p>
          <ul className={styles.orders_stats_list}>
            {pendingOrder.map((order, index) => {
              return (
                <li key={index}>
                  <p
                    className="text text_type_digits-default "
                    style={{ color: "#F2F2F3" }}
                  >
                    {order}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className={styles.numbers}>
        <p className="text text_type_main-medium">Выполнено за все время </p>
        <p className="text text_type_digits-large">{total}</p>
      </div>
      <div className={styles.numbers}>
        <p className="text text_type_main-medium">Выполнено за сегодня </p>
        <p className="text text_type_digits-large">{totalToday}</p>
      </div>
    </div>
  );
};
