import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../../services/actions/user';
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import Form from "../../components/form/form";
import InputWrapper from "../../components/form/container/input-wrappper/input-wrapper";
import FormAdditional from "../../components/form/container/form-additional/form-additional";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setVisible] = useState(false);

  const dispatch = useDispatch();
 
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(logIn(email, password));
    },
    [dispatch, email, password]
  );
  return (
    <main className={styles.main}>
      <Form  title="Вход" name="login"
        onSubmit={handleSubmit}
       >
        <InputWrapper margin="mb-6">
          <Input
            name="email"
            type="email"
            value={email}
            size="default"
            placeholder="E-mail"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </InputWrapper>
        <InputWrapper margin="mb-6">
          <Input
            name="password"
            placeholder="Пароль"
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          className="mb-20"
        >
          <Button  type="primary" size="medium">
            Войти
          </Button>
        </div>
        <FormAdditional
          link="/register"
          text="Вы — новый пользователь?"
          linkLabel="Зарегистрироваться"
          margin="mb-4"
        />
        <FormAdditional
          link="/forgot-password"
          text="Забыли пароль?"
          linkLabel="Восстановить пароль"
        />
      </Form>
    </main>
  );
};
