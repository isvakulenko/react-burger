<h1 align="center"><a  href="https://isvakulenko.github.io" target="_blank"><img src="[https://disk.yandex.ru/i/AgJmmXbEoSKcJQ](https://s278vla.storage.yandex.net/rdisk/89dbfef78f8a7081f69a2cf12ee9f63c992137963fc7f087e3bfe9350da0ac5a/633b54d3/8HzQ5BWC3yQ5mjoddmuXdQf-a08On1DQZs5R5p-dqvKIXEAC9TR98xbHxJL4vvJ0DsmM6CR-YVTMqRy__twxBA==?uid=0&filename=stellarburger.PNG&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&fsize=10392&hid=cecc62f002ef8cce6749cf116e302c9f&media_type=image&tknv=v2&etag=0dc20b9a5d692643ff558babfd15f05d&rtoken=5M4uU0GWen33&force_default=no&ycrid=na-b5c50e212fc0aecfc4521b7fcd405705-downloader7h&ts=5ea2813109ac0&s=5cfc7d417f822ccabe72ab241b81cfee6839b541aec8c0b66531e1d3cfce4b16&pb=U2FsdGVkX19r3ihF19E0Jh-6jwYHLCKiMtRadu88KLJy0FTjOSJ7Ri3_NqouuMfIZEQXe27yhe-Babi2iL-w1wF2bcAPsXvKUNNlMGnGneo)" width="100%" alt="Логотип Stellar Burgers"></a></h1>

# Яндекс.Практикум, курс "Веб разработчик плюс".
## Проектная работа  7 - 10 месяц.
# Проект Stellar Burgers.

Stellar Burgers — одностраничное приложение (SPA) космической бургерной. Позволяет собрать и заказать бургер с уникальным набором ингредиентов.
Проект предназначен для настольных компьютеров (разрешение 1280x720 и выше). 

 Cоздано при помощи [Create React App](https://github.com/facebook/create-react-app).

**Github Page**

[Ссылка на проект на Github Pages](https://isvakulenko.github.io/react-burger/)

Для выполнения заказа необходимо зарегистрироваться или авторизоваться
Можно воспользоваться тестовым аккаунтом:

e-mail: test@ya.ru\
Пароль: 123456

## Функционал:

- ингредиенты добавляются в заказ путем перетаскивания (Drag&Drop)
- Регистрация, авторизация пользователя, восстановление пароля
- Есть защищенный роутинг
- Лента заказов приходит WebSocket
- Хранение токенов в cookie
- Можно посмотреть историю заказов

## Технологии, использованные при создании:

- React.JS (шаблон CRA)
- TypeScript
- Redux + Redux-thunk
- React Router
- WebSocket
- JWT Token
- React DND
- Билиотека UI-компонентов [Яндекс.Практикум](https://github.com/yandex-praktikum/react-developer-burger-ui-components)

## Языки:

- HTML
- CSS
- JS
- TypeScript

## Дополнительные компоненты

Для работы с проектом необходимо иметь предустановленные  Git, NodeJS

## Установка проекта:

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
