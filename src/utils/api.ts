import { getCookie, setCookie } from "./cookie";
import {
  TNewOrderResponse,
  TServerResponseWithMessage,
  TGetIngredientsResponse,
  TCreateUserResponse,
  TRefreshTokenResponse,
  TLoginRequestResponse,
  TUserResponse,
} from "../utils/types/data";

//***********************************************************/
//Базовый адрес, с которого вытягиваем все данные
const Url: string = "https://norma.nomoreparties.space/Api";

//Чтобы подключиться к бэкенду для получения всех заказов
export const wsUrl: string = "wss://norma.nomoreparties.space/orders/all";

//Чтобы получить заказы конкретного пользователя
export const wsUrlPersonal: string = "wss://norma.nomoreparties.space/orders";

//************************************************************/

//***********************************************************/
// Проверяем правильность полученных данных

//  Функция checkResponse - дженерик от параметра T, а это значит, что она
//  каждый раз должна вызываться с передачей параметров в этот дженерик.
//  Поэтому, чтобы это сделать, нужно немного реструктурировать
//  код внутри then, обернув checkResponse в обёртку, таким образом
//  будет возможность передать в дженерик нужный интерфейс:
const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok
    ? res.json()
    : res.json().then((err) => Promise.reject(`Ошибка: ${err.status}`));
};

// Проверяем наличие поля success в ответе сервера
const checkSuccess = (data: any) => {
  if (data?.success) {
    return data;
  }
  return Promise.reject(data);
};
//***********************************************************/

// Получаем данные с сервера с разными ингредиентами
const getIngredientsApi = () => {
  return fetch(`${Url}/ingredients`)
    .then((res) => checkResponse<TGetIngredientsResponse>(res))
    .then(checkSuccess);
};

// Отправляем данные на сервер используя fetchWithRefresh.
//Данные в виде массива с id ингредиентов.
//В ответ сервер сформирует номер заказа.

const orderBurgerApi = (idIngredientsArr: string[]) => {
  return fetchWithRefresh<TNewOrderResponse>(`${Url}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      //Добавил пустую строку, чтобы TS не ругался на undefined
      Authorization: "" + getCookie("accessToken"),
    },
    body: JSON.stringify({ ingredients: idIngredientsArr }),
  });
};

//Способ обновления токена. Функция будет автоматически ловить ошибку и в случае недействительности
// accesstoken будет обновлять storage и поля cookie

const fetchWithRefresh = async <T>(
  url: string,
  options: RequestInit
): Promise<T> => {
  try {
    const res = await fetch(url, options);
    const data = await checkResponse<T>(res);
    return data;
  } catch (err: any) {
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
      const data = await checkResponse<T>(res);
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
  }).then((res) => checkResponse<TRefreshTokenResponse>(res));
};

// Создаем нового пользователя
const createUserApi = (email: string, password: string, name: string) => {
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
    .then((res) => checkResponse<TCreateUserResponse>(res))
    .then(checkSuccess);
};

//Делаем запрос на обновление пароля в случае его утери
const updatePasswordApi = (email: string) => {
  return fetch(`${Url}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  })
    .then((res) => checkResponse<TServerResponseWithMessage>(res))
    .then(checkSuccess);
};

// Сбрасываем ппароль при получении токена в ответном письме
const resetPasswordApi = (password: string, token: string) => {
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
    .then((res) => checkResponse<TServerResponseWithMessage>(res))
    .then(checkSuccess);
};

//Функция для входа зарегистрированного пользователя
const loginRequestApi = (email: string, password: string) => {
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
    .then((res) => checkResponse<TLoginRequestResponse>(res))
    .then(checkSuccess);
};

//Функция для выхода зарегистрированного пользователя
const logOutRequestApi = (token: string) => {
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
    .then((res) => checkResponse<TServerResponseWithMessage>(res))
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
      //Добавил пустую строку, чтобы TS не ругался на undefined
      Authorization: "" + getCookie("accessToken"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  })
    .then((res) => checkResponse<TUserResponse>(res))
    .then(checkSuccess);
};

// Обновляем данные о пользователе
const setUserRequestApi = (email: string, name: string, password: string) => {
  return fetch(`${Url}/auth/user`, {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      //Добавил пустую строку, чтобы TS не ругался на undefined
      Authorization: "" + getCookie("accessToken"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      email: email,
      name: name,
      password: password,
    }),
  })
    .then((res) => checkResponse<TUserResponse>(res))
    .then(checkSuccess);
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
