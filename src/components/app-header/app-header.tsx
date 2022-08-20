import { NavLink, useLocation } from "react-router-dom";
import {
  BurgerIcon,
  ProfileIcon,
  Logo,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../utils/hooks";
import styles from "./app-header.module.css";

const AppHeader = () => {
  const { pathname } = useLocation();
  const { user } = useSelector((store) => store.user);
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <nav className={styles.nav}>
        <div className={styles.wrap}>
          <NavLink
            to="/"
            exact={true}
            className={`${styles.button} pt-4 pb-4 pl-5 pr-5`}
            activeClassName={styles.button_active}
          >
            <BurgerIcon type={pathname === "/" ? "primary" : "secondary"} />
            <p className="text text_type_main-default ml-2">Конструктор</p>
          </NavLink>
          <NavLink
            to="/feed"
            exact={true}
            className={`${styles.button} pt-4 pb-4 pl-5 pr-5 ml-2`}
            activeClassName={styles.button_active}
          >
            <ListIcon type={pathname === "/feed" ? "primary" : "secondary"} />
            <p className="text text_type_main-default ml-2">Лента заказов</p>
          </NavLink>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <NavLink
          to="/profile"
          exact={true}
          className={`${styles.button} pt-4 pb-4 pl-5 pr-5`}
          activeClassName={styles.button_active}
        >
          <ProfileIcon
            type={pathname === "/profile" ? "primary" : "secondary"}
          />
          <p className="text text_type_main-default ml-2">
            {user?.name || "Личный кабинет"}
          </p>
        </NavLink>
      </nav>
    </header>
  );
};

export default AppHeader;
