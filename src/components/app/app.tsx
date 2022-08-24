import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "../../utils/hooks";
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
import Modal from "../modal/modal";
import IngredientInfo from "../ingredient-info/ingredient-info";
import OrderInfo from "../order-info/order-info";
import { getItems } from "../../services/actions/ingredient";
import { checkAuth } from "../../services/actions/user";
import { ProtectedRoute } from "../protected-route/protected-route";
// Надо такой Location импортировать, иначе потом возникают проблемы в Switch
import { Location } from "history"

function App() {
  const dispatch = useDispatch();
  const { isAuthChecked } = useSelector((store) => store.user);

 type TLocation = {
    from: Location;
    background?: Location;
    pathname: string;
}
  const location = useLocation<TLocation>();
  //Опциональная цепочка ?. останавливает вычисление
  // и возвращает undefined, если значение перед ?. равно undefined или null.
  const background = location?.state?.background;
  //let background = location.state && location.state.background;
  const history = useHistory();
  //Константа from содержит путь, откуда совершили переход по ссылке
  const from = location?.state?.from;

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

  const closeModal = useCallback(
    (path) => {
      history.push(path);
    },
    [history]
  );

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
              <LoginPage />
            </ProtectedRoute>
            {/* Конструктор, главная страница */}
            <Route path="/" exact={true}>
              <HomePage />{" "}
            </Route>
            {/* Лента заказов */}
            <Route path="/feed" exact={true}>
              <FeedPage />
            </Route>
            {/* Страница с информацией о заказе */}
            <Route path="/feed/:id" exact={true} children={<OrderInfoPage />} />
            {/* Регистрация */}
            <ProtectedRoute anonymous={true} path="/register" exact={true}>
              <RegisterPage />
            </ProtectedRoute>
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
             {/* История заказов в профиле*/}
            <ProtectedRoute path="/profile/orders" exact={true}>
              <OrderHistoryPage />
            </ProtectedRoute>
             {/* Информация о заказе на отдельной странице*/}
            <ProtectedRoute path="/profile/orders/:id" exact={true}>
              <OrderInfoPage userToken />
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
