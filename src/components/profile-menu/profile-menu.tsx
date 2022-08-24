import { useCallback } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch} from "../../utils/hooks";
import { logOut } from "../../services/actions/user";
import styles from "./profile-menu.module.css";
import { NavLink } from "react-router-dom";

const ProfileMenu = () => {
  const dispatch = useDispatch();
  const refreshToken= localStorage.getItem("refreshToken");

  const handleLogOut = useCallback(() => {
    //  refreshToken &&  - чтобы не ругалось на null
    refreshToken &&  dispatch(logOut(refreshToken));
    <Redirect to={"/"} />;
  }, [dispatch, refreshToken]);

  return (
    <nav className={styles.menu}>
      <ul className={`${styles.menu__list} mb-20`}>
        <li>
          <NavLink
            to="/profile"
            exact={true}
            className={`${styles.menu__item} text text_type_main-medium pt-4 pb-4`}
            activeClassName={styles.menu__item_active}
          >
            Профиль
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile/orders"
            exact={true}
            className={`${styles.menu__item} text text_type_main-medium pt-4 pb-4`}
          >
            История заказов
          </NavLink>
        </li>
        <li>
          <button
            onClick={handleLogOut}
            className={`${styles.menu__btn} text text_type_main-medium text_color_inactive pt-4 pb-4`}
          >
            Выход
          </button>
        </li>
      </ul>
      <p
        className={`text text_type_main-default text_color_inactive ${styles.menu__comment}`}
      >
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </nav>
  );
};

 export default ProfileMenu;
