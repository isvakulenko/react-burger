//Адрес. с которого вытягиваем данные об ингридиетах
const Url = "https://norma.nomoreparties.space/api/ingredients";


function checkResponse(res) {

  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
};

export const getIngredients = () => {
return fetch(Url)
.then(checkResponse)
.then(res => {console.log(res)})
    .then(data => {
      if (data.success) return data.data;
 return Promise.reject(data)
   })
};

