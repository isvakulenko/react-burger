import { useMemo } from "react";
import { useDispatch, useSelector } from "../../utils/hooks";
import { useDrop } from "react-dnd";
import { useHistory } from "react-router-dom";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import BurgerConstructorComponent from "../burger-constructor-component/burger-constructor-component";
import OrderDetails from "../order-details/order-details";
import { addToConstructor} from "../../services/actions/constructor";
import { orderBurger} from "../../services/actions/order";
import { RESET_ORDER, CONSTRUCTOR_RESET} from "../../services/constants/index";
import { TConstructorlngredient } from "../../utils/types/data";


const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const constructorState = useSelector((state) => state.burgerConstructor);
  const orderModalData = useSelector((state) => state.order.data);
  const isOrderRequest = useSelector((state) => state.order.isLoading);
  const { user } = useSelector((store) => store.user);
  const history = useHistory();
  
  const [, drop] = useDrop({
    accept: "add_ingredient",
    drop: (item:TConstructorlngredient) => dispatch(addToConstructor(item)),
  });

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

  const handleOrderClick = () => {
    // без булок не отправляем запрос
    if (!constructorState.bun || isOrderRequest) return;
    // отправляем ингредиенты на сервер
    if (user) {
      dispatch(
        orderBurger(
          [constructorState.bun._id]
            .concat(constructorState.ingredients.map((ing) => ing._id))
            .concat(constructorState.bun._id)
        )
      );
    } else {
      history.replace({
        pathname: "/login",
        state: {
          from: {
            pathname: "/",
          },
        },
      });
    }
  };
  //При закрытии окна с номером заказа сбросим хранилище заказа
  // и очистим конструктор
  const closeOrderDetail = () => {
    dispatch({ type: RESET_ORDER });
    dispatch({ type: CONSTRUCTOR_RESET });
  };

  return (
    <section className={`${styles.menu} pt-25`} ref={drop}>
      {constructorState.bun && (
        <div className="mt-4 mb-4">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${constructorState.bun.name} (верх)`}
            price={constructorState.bun.price}
            thumbnail={constructorState.bun.image}
          />
        </div>
      )}

      <div className={styles.content}>
        <ul className={styles.list}>
          {constructorState.ingredients.map((item, index) => {
            return (
              <BurgerConstructorComponent
                ingredient={item}
                index={index}
                key={item.id}
              />
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
      {orderModalData && (
        <Modal onClose={closeOrderDetail}>
          <OrderDetails orderNumber={orderModalData.order.number} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
