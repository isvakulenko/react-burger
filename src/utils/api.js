//Адрес. с которого вытягиваем данные об ингридиетах
const Url = "https://norma.nomoreparties.space/api";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}
// Получаем данные с сервера с разными ингредиентами
const getIngredients = () => {
  return (
    fetch(`${Url}/ingredients`)
      .then(checkResponse)
      //.then(data => console.log(data))
      // .then(res => {console.log (res)})
      .then((data) => {
        if (data.success) return data;
        return Promise.reject(data);
      })
  );
};
// Отправляем данные на сервер.
//Данные в виде массива с id ингредиентов.
//В ответ сервер сформирует номер заказа.
const orderBurgerApi = (idIngredientsArr) => {
  return fetch(`${Url}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ ingredients: idIngredientsArr }),
  }).then(checkResponse);
};
export { getIngredients, orderBurgerApi };


