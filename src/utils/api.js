import { getCookie, setCookie } from "../utils/cookie";

//********************************************************* */
//Базовый с которого вытягиваем все данные
const Url = "https://norma.nomoreparties.space/Api";

//Чтобы подключиться к бэкенду для получения всех заказов
export const wsUrl = 'wss://norma.nomoreparties.space/orders/all';

//Чтобы получить заказы конкретного пользователя
const WSS_ORDERS = 'wss://norma.nomoreparties.space/orders';

//********************************************************** */

// Проверяем правильность полученных данных
function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  //return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

// Поверяем наличие поля success в ответе сервера
function checkSuccess(data) {
  if (data?.success) {
    return data;
  }
  return Promise.reject(data);
}

// Получаем данные с сервера с разными ингредиентами
const getIngredientsApi = () => {
  return (
    fetch(`${Url}/ingredients`)
      .then(checkResponse)
      //.then(data => console.log(data))
      // .then(res => {console.log (res)})
      .then(checkSuccess)
  );
};
// Отправляем данные на сервер используя fetchWithRefresh.
//Данные в виде массива с id ингредиентов.
//В ответ сервер сформирует номер заказа.
const orderBurgerApi = (idIngredientsArr) => {
  return fetchWithRefresh(`${Url}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: getCookie("accessToken"),
    },
    body: JSON.stringify({ ingredients: idIngredientsArr }),
  }).then(checkSuccess);
};

// Создаем нового пользователя
const createUserApi = ({ email, password, name }) => {
  return fetch(`${Url}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  })
    .then(checkResponse)
    .then(checkSuccess);
};
//Делаем запрос на обновление пароля в случае его утери
const updatePasswordApi = ({ email }) => {
  return fetch(`${Url}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  })
    .then(checkResponse)
    .then(checkSuccess);
};

// Сбрасываем ппароль при получении токена в ответном письме
const resetPasswordApi = ({ password, token }) => {
  return fetch(`${Url}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      token,
    }),
  })
    .then(checkResponse)
    .then(checkSuccess);
};

//Функция для входа зарегистрированного пользователя
const loginRequestApi = ({ email, password }) => {
  return fetch(`${Url}/auth/login`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse)
    .then(checkSuccess);
};

//Функция для выхода зарегистрированного пользователя
const logOutRequestApi = ({ token }) => {
  return fetch(`${Url}/auth/logout`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ token }),
  })
    .then(checkResponse)
    .then(checkSuccess);
};

// Получаем информацию о пользователе
const getUserRequestApi = () => {
  return fetch(`${Url}/auth/user`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("accessToken"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  })
    .then(checkResponse)
    .then(checkSuccess);
};

// Обновляем данные о пользователе
const setUserRequestApi = ( email, name, password) => {
  return fetch(`${Url}/auth/user`, {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("accessToken"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      email: email,
      name: name,
      password: password
    }),
  })
    .then(checkResponse)
    .then(checkSuccess);
};

//Способ обновления токена. Функция будет автоматически ловить ошибку и в случае недействительности
// accesstoken будет обновлять storage и поля cookie

const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    const data = await checkResponse(res);
    return data;
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject();
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      setCookie("accessToken", refreshData.accessToken);
      const res = await fetch(url, {
        ...options,
        headers: { ...options.headers, Authorization: refreshData.accessToken },
      });
      const data = await checkResponse(res);
      return data;
    } else {
      return Promise.reject(err);
    }
  }
};

const refreshToken = () => {
  return fetch(`${Url}/auth/token`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse);
};

export {
  getIngredientsApi,
  orderBurgerApi,
  getUserRequestApi,
  setUserRequestApi,
  loginRequestApi,
  logOutRequestApi,
  createUserApi,
  resetPasswordApi,
  updatePasswordApi,
};
