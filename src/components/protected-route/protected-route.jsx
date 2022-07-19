import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export const ProtectedRoute = ({ anonymous = false, children, ...rest }) => {
  const { user, isAuthChecked } = useSelector((store) => store.user);
  const location = useLocation();
  // console.log('isAuthChecked', isAuthChecked);
  // console.log('user', user);
  // ------------------------------------------------------------------
  // От наставника
  //В защищенном роуте ProtectedRoute мы можем добавить задержку,
  // которая сначала подождет, когда токен проверится, и только потом
  // будет рендерить содержимое. В таком случае преждевременного редиректа
  //на /login не будет, если пользователь действительно авторизован.

  //----------------------------------------------------------------

  if (!isAuthChecked) {
    return <p>Секундочку</p>; // Показываем типа загрузку приложения
  }

  if (anonymous && user) {
    //В from сохраним текущий маршрут или главную страницу
    const { from } = location.state || { from: { pathname: "/" } };
    return (
      <Route {...rest}>
        <Redirect to={from} />
      </Route>
    );
  }

  if (!anonymous && !user) {
    return (
      <Route {...rest}>
        <Redirect
          to={{
            // Маршрут, на который произойдёт переадресация
            pathname: "/login",
            // В from сохраним текущий маршрут
            state: { from: location },
          }}
        />
      </Route>
    );
  }
  return <Route {...rest}>{children}</Route>;
};
