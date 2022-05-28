import React, { useMemo, useState, useContext } from "react";
import {
  Button,
  DragIcon,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";

import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

import { BurgerConstructorContext } from "../../contex/burger-constructor-context";
import { saveOrder } from "../../utils/api";

const BurgerConstructor = () => {
  const { constructorState, constructorDispatcher } = useContext(
    BurgerConstructorContext
  );
  const [modalData, setModalData] = useState(null);
  // Булевый стейт для модалки заказа
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(null);
  const openOrderDetail = () => setIsOrderDetailsOpened(true);
  const closeOrderDetail = () => setIsOrderDetailsOpened(false);

  //Подсчитаем итоговую стоимость заказа

  const price = useMemo(() => {
    return (
      (constructorState.bun ? constructorState.bun.price * 2 : 0) +
      constructorState.ingredients.reduce(
        (sum, current) => sum + current.price,
        0
      )
    );
  }, [constructorState]);

  // открываем модальное окно
  const handleOrderClick = () => {
    // сохраняем ингредиенты на сервер
    saveOrder(constructorState.order).then((data) => {
      // полученный ответ помещаем в стейт для модалки
      setModalData(data);
      openOrderDetail();
      // в ответе номер заказа лежит в data.order.number
    });
  };

  return (
    <section className={`${styles.menu} pt-25`}>
      {constructorState.bun && (
        <div className="mt-4 mb-4">
          <ConstructorElement
            type="top"
            text={`${constructorState.bun.name} (верх)`}
            price={constructorState.bun.price}
            thumbnail={constructorState.bun.image}
            handleClose={() =>
              constructorDispatcher({
                type: "DELETE",
                payload: constructorState.bun,
              })
            }
          />
        </div>
      )}
      <div className={styles.content}>
        <ul className={styles.list}>
          {constructorState.ingredients.map((item, index) => {
            return (
              <li className={`${styles.item} mt-4 mb-4`} key={index}>
                <DragIcon />
                <ConstructorElement
                  isLocked={false}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                  handleClose={() =>
                    constructorDispatcher({ type: "DELETE", payload: item })
                  }
                />
              </li>
            );
          })}
        </ul>
      </div>
      {constructorState.bun && (
        <div className="mt-4 mb-4">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${constructorState.bun.name} (низ)`}
            price={constructorState.bun.price}
            thumbnail={constructorState.bun.image}
          />
        </div>
      )}
      <div className={styles.order}>
        <div className={`${styles.cost} mr-10`}>
          <p className="text text_type_digits-medium mr-2">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={handleOrderClick}>
          Оформить заказ
        </Button>
      </div>
      {isOrderDetailsOpened && (
        <Modal onClose={closeOrderDetail}>
          <OrderDetails orderNumber={modalData.order.number} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
