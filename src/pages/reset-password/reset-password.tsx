import { useCallback, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "../../utils/hooks";
import { resetPassword } from "../../services/actions/user";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";
import Form from "../../components/form/form";
import InputWrapper from "../../components/form/container/input-wrappper/input-wrapper";
import FormAdditional from "../../components/form/container/form-additional/form-additional";
import { FormEvent } from "react";

export const ResetPasswordPage = () => {
  const [token, setToken] = useState("");
  const { user, message, updPasswordRequest } = useSelector((store) => store.user);
  const [password, setPassword] = useState("");
  const [isVisible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation<{from: string}>();
  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      dispatch(resetPassword(password, token));
    },
    [dispatch, password, token]
  );
  if (user) {
    // Если объект state не является undefined, вернём пользователя назад.
    return <Redirect to={location.state?.from || "/"} />;
  }

  //Неавторизованный пользователь не может напрямую попасть
  // на маршрут /reset-password
  // Без флага updPasswordRequest переходит в бесконечный цикл с ошибкой
  if (updPasswordRequest && !user) {
    return (
      <Redirect
        to={{
          pathname: "/forgot-password",
        }}
      />
    );
  }

  if (message === "Password successfully reset") {
    return (
      <Redirect
        to={{
          pathname: "/login",
        }}
      />
    );
  }
  return (
    <main className={styles.main}>
      <Form
        title="Восстановление пароля"
        name="reset-password"
        onSubmit={handleSubmit}
      >
        <InputWrapper margin="mb-6">
          <Input
            name="password"
            placeholder="Введите новый пароль"
            value={password}
            type={isVisible ? "text" : "password"}
            size="default"
            icon={!isVisible ? "HideIcon" : "ShowIcon"}
            onIconClick={() => setVisible(!isVisible)}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </InputWrapper>
        <InputWrapper margin="mb-6">
          <Input
            name="token"
            type="text"
            value={token}
            size="default"
            placeholder="Введите код из письма"
            onChange={(e) => {
              setToken(e.target.value);
            }}
          />
        </InputWrapper>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          className="mb-20"
        >
          <Button type="primary" size="medium">
            Сохранить
          </Button>
        </div>
        <FormAdditional
          link="/login"
          text="Вспомнили пароль"
          linkLabel="Войти"
          margin="mb-4"
        />
      </Form>
    </main>
  );
};
