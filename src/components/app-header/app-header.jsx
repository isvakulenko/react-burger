import React from "react";
import {
  BurgerIcon,
  ProfileIcon,
  Logo,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./app-header.module.css";

const AppHeader = () => {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <nav className={styles.nav}>
        <div className={styles.wrap}>
          <a href="#" className={`${styles.button} pt-4 pb-4 pl-5 pr-5`}>
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default ml-2">Конструктор</p>
          </a>
          <a href="#" className={`${styles.button} pt-4 pb-4 pl-5 pr-5 ml-2`}>
            <ListIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive ml-2">
              Лента заказов
            </p>
          </a>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <a href="#" className={`${styles.button} pt-4 pb-4 pl-5 pr-5`}>
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive ml-2">
            Личный Кабинет
          </p>
        </a>
      </nav>
    </header>
  );
};

export default AppHeader;
