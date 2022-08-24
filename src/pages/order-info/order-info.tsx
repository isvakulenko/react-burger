import { FC } from "react";
import { useDispatch, useSelector } from "../../utils/hooks";
import { useEffect } from "react";
import { OrderInfo } from "../../components/order-info/order-info";
import { wsInit, wsClose, wsInitWithToken } from "../../services/actions/ws";
import styles from "./order-info.module.css";
import { getCookie } from "../../utils/cookie";
import { wsUrlPersonal } from "../../utils/api";

type TOrderInfoPageProps = {
  userToken?: boolean;
}

export const OrderInfoPage: FC<TOrderInfoPageProps> = ({ userToken }) => {
const dispatch = useDispatch();
// Для обращения по сокет-соединению используйте только токен, без Bearer.
const accessToken = (getCookie("accessToken") || "" ).split('Bearer ')[1];

  useEffect(() => {
    if (userToken) {
      dispatch(wsInitWithToken(`${wsUrlPersonal}?token=${accessToken}`));
    } else {
      dispatch(wsInit());
    }
    //оборвем соединение при уходе со страницы
    return () => {
      dispatch(wsClose());
    };
  }, [dispatch, userToken, accessToken]);

  //все заказы, пришедшие в ответ по WebSocket
  const { orders, wsRequest, wsFailed } = useSelector((store) => store.ws);

  return (
    <>
      {wsRequest && !wsFailed && (
        <p
          className="text text_type_main-medium mt-10"
          style={{ textAlign: "center" }}
        >
          Загружаем информацию о заказе...
        </p>
      )}
      {!wsRequest && !wsFailed && orders && (
        <main className={styles.main}>
          <OrderInfo />
        </main>
      )}
    </>
  );
};
