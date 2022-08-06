  //Для правильного отображения данных как в макете,
  // их необходимо привести к соответствующему виду
const formatTime = (date) => {
  // Сегодняшняя дата в номере дня
  let today = new Date().getDate();
  // Получим количество мс
  let ms = Date.parse(date);
  // Создадим объект с датой заказа
  let orderDate = new Date(ms);
  // Час заказа
  let hr = orderDate.getHours();
  if (hr < 10) hr = "0" + hr;
  //Минуты заказа
  let min = orderDate.getMinutes();
  if (min < 10) min = "0" + min;
  // Время заказа
  const orderTime = `${hr}:${min} i-GMT+3`;

  let formatData = "";
  switch (orderDate.getDate()) {
    case today:
      formatData = `Сегодня, ${orderTime}`;
      break;
    case today - 1:
      formatData = `Вчера, ${orderTime}`;
      break;
    case today - (today - orderDate.getDate()):
      formatData = `${today - orderDate.getDate()} дня назад , ${orderTime}`;
      break;
    default:
      formatData = "Давно";
      break;
  }
  return formatData;
};
export default formatTime;
