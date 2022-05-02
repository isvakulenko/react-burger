import React from "react";
import {
  BurgerIcon,
  ProfileIcon,
  Logo,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import style from "./app-header.module.css";

const AppHeader = () => {
  return (
    <header className={`${style.header} mr-10 ml-10 mt-10 p-4`}>
      <nav className={style.nav}>
        <div className={style.wrap}>
          <a className={`${style.button} pt-4 pb-4 pl-5 pr-5`}>
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default ml-2">Конструктор</p>
          </a>
          <a className={`${style.button} pt-4 pb-4 pl-5 pr-5 ml-2`}>
            <ListIcon type="primary" />
            <p className="text text_type_main-default ml-2">Лента заказов</p>
          </a>
        </div>
        <div className={style.logo}>
          <Logo />
        </div>
        <a className={`${style.button} pt-4 pb-4 pl-5 pr-5`}>
          <ProfileIcon type="primary" />
          <p className="text text_type_main-default ml-2">Личный Кабинет</p>
        </a>
      </nav>
    </header>
  );
};

export default AppHeader;
