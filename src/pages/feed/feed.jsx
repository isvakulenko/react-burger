import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OrderList } from "../../components/order-list/order-list";
import { OrderStat } from "../../components/order-stat/order-stat";
import styles from "./feed.module.css";
import { wsInit, wsClose } from "../../services/actions/ws";

export const FeedPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(wsInit());
    //оборвем соединение при уходе со страницы
    return () => {
      dispatch(wsClose());
    };
  }, [dispatch]);

  //все заказы, пришедшие в ответ по WebSocket
  const { orders, wsRequest, wsFailed } = useSelector((store) => store.ws);
  //console.log(orders)

  return (
    <>
      {wsRequest && !wsFailed && (
        <p
          className="text text_type_main-medium mt-10"
          style={{ textAlign: "center" }}
        >
          Загружаем ленту заказов...
        </p>
      )}
      {!wsRequest && !wsFailed && orders && (
        <main className={styles.main}>
          <section className={styles.menu}>
            <h1 className="text text_type_main-large mt-10 mb-5">
              Лента заказов
            </h1>
            <div className={styles.content}>
              <OrderList />
              <OrderStat />
            </div>
          </section>
        </main>
      )}
    </>
  );
};
