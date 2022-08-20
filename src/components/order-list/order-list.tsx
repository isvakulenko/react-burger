import { useSelector } from "../../utils/hooks";
import { OrderCard } from "../order-card/order-card";
import styles from "./order-list.module.css";

export const OrderList = () => {
  const { orders } = useSelector((store) => store.ws);
  //console.log (orders)
  return (
    <ul className={styles.list}>
      {/* Non-null Assertion Operator (Postfix!)  */}
      {orders!.map((order) => {
        return <OrderCard key={order._id} order={order} />;
      })}
    </ul>
  );
};
