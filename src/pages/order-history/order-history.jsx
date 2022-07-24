import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { wsClose, wsInitWithToken } from "../../services/actions/ws";
import styles from "./order-history.module.css";
import { OrderList } from "../../components/order-list/order-list";
import ProfileMenu from '../../components/profile-menu/profile-menu';
import { getCookie } from "../../utils/cookie";
import { wsUrlPersonal } from "../../utils/api";

 export const OrderHistoryPage = () => {
  const dispatch = useDispatch();
  // Для обращения по сокет-соединению используйте только токен, без Bearer.
  const accessToken = getCookie("accessToken").split('Bearer ')[1];
//  console.log (accessToken)
  useEffect(() => {
    dispatch(wsInitWithToken(`${wsUrlPersonal}?token=${accessToken}`));
    
    //оборвем соединение при уходе со страницы
    return () => {
      dispatch(wsClose());
    };
  }, [dispatch, accessToken]);
  //все заказы, пришедшие в ответ по WebSocket
  const { orders, wsRequest, wsFailed } = useSelector((store) => store.ws);
  
return(
<main className={styles.main}>
<aside className={styles.profile_menu}>
        <ProfileMenu />
      </aside>
      {wsRequest && !wsFailed && (
        <p
          className="text text_type_main-medium mt-10"
          style={{ textAlign: "center" }}
        >
          Загружаем информацию о заказах...
        </p>
      )}
      {!wsRequest && !wsFailed && orders && (
        <main className={styles.list}>
          <OrderList />
        </main>)}
</main>

)

};