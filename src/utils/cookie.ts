// Файл целиком взят из тренажера по теме "Авторизация и роутинг в веб-приложениях"

export function getCookie(name: string){
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

//От наставника
// Сейчас же можно accessToken положить в обыную куку
//(в тренажере приводится не совсем корректный пример функции
// setCookie - там не задается path и возможна ситуация, 
//когда на разных страницах в cookies будут разные токены, 
//поэтому можно чутка эту функцию допилить, 
//т.е. в path задавать корень сайта path: '/'), 
//а refreshToken -- в localStorage.

export function setCookie (
name: string,
value: string,
props: { [key: string]: any } & { expires?: number | Date | string } = {}) {
  // в тренажере
  //props = props || {}; 
props = {path: "/", ...props}
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && (exp as Date).toUTCString) {
    props.expires = (exp as Date).toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}


export function deleteCookie(name: string) {
  setCookie(name, '', { expires: -1 });
}
