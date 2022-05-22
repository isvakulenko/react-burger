import React, { useState } from "react";
import {
  Button,
  DragIcon,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import { IngredientPropTypes } from "../../utils/prop-types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

const BurgerConstructor = ({ ingredientsConstructor }) => {
  // Булевый стейт для модалки заказа
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);
  const openOrderDetail = () => setIsOrderDetailsOpened(true);
  const closeOrderDetail = () => setIsOrderDetailsOpened(false);

  const otherIngredients = ingredientsConstructor.filter(
    (item) => item.type !== "bun"
  );

  console.log(otherIngredients);
  return (
    <section className={`${styles.menu} pt-25`}>
      <div className="mt-4 mb-4">
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-02-mobile.png"}
        />
      </div>
      <div className={styles.content}>
        <ul className={styles.list}>
          {otherIngredients.map((item, index) => {
            return (
              <li className={`${styles.item} mt-4 mb-4`} key={index}>
                <DragIcon />
                <ConstructorElement
                  isLocked={false}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <div className="mt-4 mb-4">
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-02-mobile.png"}
        />
      </div>
      <div className={styles.order}>
        <div className={`${styles.cost} mr-10`}>
          <p className="text text_type_digits-medium mr-2">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={openOrderDetail}>
          Оформить заказ
        </Button>
      </div>
      {isOrderDetailsOpened && (
        <Modal onClose={closeOrderDetail}>
          <OrderDetails orderNumber={1234567} />
        </Modal>
      )}
    </section>
  );
};

BurgerConstructor.propTypes = {
  ingredientsConstructor: PropTypes.arrayOf(IngredientPropTypes.isRequired)
    .isRequired,
};

export default BurgerConstructor;
