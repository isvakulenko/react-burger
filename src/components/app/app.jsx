import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  LoginPage,
  HomePage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  NotFoundPage,
} from "../../pages";
import AppHeader from "../app-header/app-header";
import { getCookie } from "../../utils/cookie";
//import Loader from "../loader/loader";
import Modal from "../modal/modal";
import IngredientInfo from "../ingredient-info/ingredient-info";
import { getItems } from "../../services/actions/ingredient";
import { checkAuth } from "../../services/actions/user";
import { ProtectedRoute } from "../protected-route/protected-route";

function App() {
  const dispatch = useDispatch();
  const { isAuthChecked } = useSelector((store) => store.user);
  const ingredientInModal = useSelector((state) => state.ingredientDetail.info);
  //console.log('isAuthChecked', isAuthChecked);

  const location = useLocation();
  //Опциональная цепочка ?. останавливает вычисление
  // и возвращает undefined, если значение перед ?. равно undefined или null.
  const background = location.state?.background;
  //let background = location.state && location.state.background;
  // const accessToken = getCookie('accessToken');
  // console.log(`Bearer ${accessToken}`);
  // При загрузке страницы запросим все ингредиенты с сервера
  useEffect(() => {
    dispatch(getItems());
    // А также проверим, авторизован ли пользователь
    dispatch(checkAuth());
  }, [dispatch]);

  console.log("isAuthChecked", isAuthChecked);

  return (
    <>
      {!isAuthChecked && (
        <p className="text text_type_main-medium">Загружаем...</p>
      )}
      {isAuthChecked && (
        <>
          <AppHeader />
          <Switch location={background || location}>
            {/* Вход */}
            <ProtectedRoute anonymous={true} path="/login">
              <LoginPage />
            </ProtectedRoute>
            {/* Конструктор */}
            <Route path="/" exact={true}>
              <HomePage />
            </Route>
            {/* Регистрация */}
            <Route anonymous={true} path="/register" exact={true}>
              <RegisterPage />
            </Route>
            {/* Восстановление пароля */}
            <ProtectedRoute
              anonymous={true}
              path="/forgot-password"
              exact={true}
            >
              <ForgotPasswordPage />
            </ProtectedRoute>
            {/* Сброс пароля */}
            <ProtectedRoute
              anonymous={true}
              path="/reset-password"
              exact={true}
            >
              <ResetPasswordPage />
            </ProtectedRoute>
            {/* Попап с модальным окном */}
            <Route
              path="/ingredients/:id"
              exact={true}
              children={<IngredientInfo ingredientData={ingredientInModal} />}
            />
            {/* Страница профиля*/}
            <ProtectedRoute path="/profile" exact={true}>
              <ProfilePage />
            </ProtectedRoute>
            {/* Если адрес неверный */}
            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>

          {/* Попап с модальным окном */}
          {background && (
            <Route
              path="/ingredients/:id"
              children={
                <Modal>
                  <IngredientInfo ingredientData={ingredientInModal} />
                </Modal>
              }
            />
          )}
        </>
      )}
    </>
  );
}

export default App;
