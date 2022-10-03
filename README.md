<a  href="https://isvakulenko.github.io" target="_blank"><img src="https://disk.yandex.ru/i/AgJmmXbEoSKcJQ" width="100%" alt="Логотип Stellar Burgers"></a>

# <a id="top" />Яндекс.Практикум, курс "Веб разработчик плюс".
## Проектная работа  7 - 10 месяц.
## Проект Stellar Burgers.
## Оглавление

- [Описание:](#description)
- [Github Page:](#github)
- [Функционал:](#func)
- [Технологии, использованные при создании:](#tech)
- [Языки:](#lang)
- [Дополнительные компоненты:](#add)
- [Установка проекта:](#install)

## <a id="description" />Описание:

Stellar Burgers — одностраничное приложение (SPA) космической бургерной. Позволяет собрать и заказать бургер с уникальным набором ингредиентов.
Проект предназначен для настольных компьютеров (разрешение 1280x720 и выше).

 Cоздано при помощи [Create React App](https://github.com/facebook/create-react-app).

## <a id="github" />Github Page:

[Ссылка на проект на Github Pages](https://isvakulenko.github.io/react-burger/)

Для выполнения заказа необходимо зарегистрироваться или авторизоваться.\
Можно воспользоваться тестовым аккаунтом:

e-mail: test@ya.ru\
Пароль: 123456

## <a id="func" />Функционал:

- ингредиенты добавляются в заказ путем перетаскивания (Drag&Drop)
- Регистрация, авторизация пользователя, восстановление пароля
- Есть защищенный роутинг
- Лента заказов приходит WebSocket
- Хранение токенов в cookie
- Можно посмотреть историю заказов

## <a id="tech" />Технологии, использованные при создании:

- React.JS (шаблон CRA)
- TypeScript
- Redux + Redux-thunk
- React Router
- WebSocket
- JWT Token
- React DND
- Билиотека UI-компонентов [Яндекс.Практикум](https://github.com/yandex-praktikum/react-developer-burger-ui-components)

## <a id="lang" />Языки:

- HTML
- CSS
- JS
- TypeScript

## <a id="add" />Дополнительные компоненты:

Для работы с проектом необходимо иметь предустановленные  Git, NodeJS

## <a id="install" />Установка проекта:

Перейдите в вашу папку для хранения репозиториев. В командной строке вышего  IDE выполните следующую команду клонирования с GitHub:
```sh
`$ git clone git@github.com:isvakulenko/react-burger.git`
```

Для установки необходимых пакетов выполните:
```sh
`$ npm install`
```

Для запуска проекта на локальном сервере:
```sh
`$ npm start`
```

Запускает приложение в режиме разработки.\
В браузере откроется страница по адресу [http://localhost:3000 ](http://localhost:3000 ).

Страница перезагрузится, если вы внесете изменения.\
Вы также увидите любые ошибки  в консоли.

[В начало](#top)
