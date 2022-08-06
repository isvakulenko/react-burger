import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  LoginPage,
  HomePage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  FeedPage,
  OrderInfoPage,
  OrderHistoryPage,
  NotFoundPage,
} from "../../pages";
import AppHeader from "../app-header/app-header";
//import Loader from "../loader/loader";
import Modal from "../modal/modal";
import IngredientInfo from "../ingredient-info/ingredient-info";
import OrderInfo from "../order-info/order-info";
import { getItems } from "../../services/actions/ingredient";
import { checkAuth } from "../../services/actions/user";
import { ProtectedRoute } from "../protected-route/protected-route";
//import { closeIngredientModal } from "../../services/actions/ingredient-detail";

function App() {
  const dispatch = useDispatch();
  const { isAuthChecked } = useSelector((store) => store.user);

  const location = useLocation();
  //Опциональная цепочка ?. останавливает вычисление
  // и возвращает undefined, если значение перед ?. равно undefined или null.
  const background = location.state?.background;
  //let background = location.state && location.state.background;
  const history = useHistory();
  //Констнта from содержит путь, откуда совершили переход по ссылке
  const from = location.state?.from;

  // При загрузке страницы запросим все ингредиенты с сервера
  useEffect(() => {
    dispatch(getItems());
    // А также проверим, авторизован ли пользователь
    dispatch(checkAuth());
  }, [dispatch]);

  //все заказы, пришедшие в ответ по WebSocket
  const { orders, wsRequest, wsFailed } = useSelector((store) => store.ws);

  //Если открыть попап ингредиента и закрыть его, то в адресной строке так и остаётся id ингредиента.
  // А он должен пропадать. Для этого нужно делать переход назад по истории браузера.
  // Dispatch не подходит.

  // const closeModal = () => {
  //   dispatch(closeIngredientModal());
  // };

  const closeModal = useCallback(
    (path) => {
      history.push(path);
    },
    [history]
  );

  // console.log("isAuthChecked", isAuthChecked);
  // console.log("background", background);

  return (
    <>
      {!isAuthChecked && (
        <p
          className="text text_type_main-medium"
          style={{ textAlign: "center" }}
        >
          Загружаем приложение...
        </p>
      )}
      {isAuthChecked && (
        <>
          <AppHeader />
          <Switch location={background || location}>
            {/* Вход */}
            <ProtectedRoute anonymous={true} path="/login">
              {" "}
              <LoginPage />
            </ProtectedRoute>
            {/* Конструктор, главная страница */}
            <Route path="/" exact={true}>
              {" "}
              <HomePage />{" "}
            </Route>
            {/* Лента заказов */}
            <Route path="/feed" exact={true}>
              <FeedPage />
            </Route>
            {/* Попап с информацией о заказе */}
            <Route path="/feed/:id" exact={true} children={<OrderInfoPage />} />
            {/* Регистрация */}
            <Route anonymous={true} path="/register" exact={true}>
              {" "}
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
            {/* Страница с информацией об ингредиенте */}
            <Route
              path="/ingredients/:id"
              exact={true}
              children={<IngredientInfo />}
            />
            {/* Страница профиля*/}
            <ProtectedRoute path="/profile" exact={true}>
              <ProfilePage />
            </ProtectedRoute>
            <ProtectedRoute path="/profile/orders" exact={true}>
              <OrderHistoryPage />
            </ProtectedRoute>
            <ProtectedRoute path="/profile/orders/:id" exact={true}>
              <OrderInfoPage userToken/>
            </ProtectedRoute>
            {/* Если адрес неверный */}
            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
          {/* Попап с модальным окном информации об ингредиенте */}
          {background && (
            <Route
              path="/ingredients/:id"
              children={
                <Modal
                  onClose={() => {
                    closeModal("/");
                  }}
                >
                  <IngredientInfo />
                </Modal>
              }
            />
          )}
          {/* Попап с модальным окном информации о заказе */}
          {background && (
            <Route
              path={`${from}/:id`}
              children={
                <Modal
                  onClose={() => {
                    closeModal(from);
                  }}
                >
                  {!wsFailed && wsRequest && (
                    <p className="text text_type_main-medium">
                      Загружаем информацию о заказе...
                    </p>
                  )}
                  {orders && <OrderInfo />}
                </Modal>
              }
            />
          )}
        </>
      )}
    </>
  );
}
//

export default App;
