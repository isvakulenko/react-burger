import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import styles from "./feed.module.css";

export const FeedPage = () => {
  // useEffect(() => {
  //   dispatch(
  //   );
  // }, [dispatch]);


//   const dispatch = useDispatch();
//   const orders = useSelector((store) => feed.orders);
// if(!orders.length){
//  return ( <p className="text text_type_main-medium">Загружаем заказы...</p>)
// }


  return(
    <main className={styles.main}>
<section className={styles.menu}>
      <h1 className= "text text_type_main-large mt-10 mb-5">Лента заказов</h1>
 <div className={styles.content}>
   {/* <FeedList orders-{orders}/>
   <FeedStat/> */}

 </div>
 </section>
      
    </main>
      
  )
}
