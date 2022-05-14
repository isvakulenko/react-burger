import styles from "./order-details.module.css";
import img from "../../images/done.svg";

const OrderDetails = ({ orderNumber }) => {
  return (
    <div className={`${styles.container} pt-30 pb-30`}>
      <h2 className={`${styles.title} text text_type_digits-large `}>
        {orderNumber}
      </h2>
      <p className={"text text_type_main-medium pt-8"}>идентификатор заказа</p>
      <img src={img} alt="OK" className={`${styles.image} pt-15 pb-15`} />
      <p className={"text text_type_main-default"}>Ваш заказ начали готовить</p>
      <p className={"text text_type_main-default text_color_inactive pt-2"}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
