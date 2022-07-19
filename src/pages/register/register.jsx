import { useCallback, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../services/actions/user";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import Form from "../../components/form/form";
import InputWrapper from "../../components/form/container/input-wrappper/input-wrapper";
import FormAdditional from "../../components/form/container/form-additional/form-additional";

export const RegisterPage = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setVisible] = useState(false);

  const { user } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const location = useLocation();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(registerUser(email, password, userName));
    },
    [dispatch, email, password, userName]
  );
  if (user) {
    // Если объект state не является undefined, вернём пользователя назад.
    return <Redirect to={"/"} />;
  }

  return (
    <main className={styles.main}>
      <Form
        className={styles.form}
        title="Регистрация"
        name="register"
        onSubmit={handleSubmit}
      >
        <InputWrapper margin="mb-6">
          <Input
            name="userName"
            type="text"
            value={userName}
            size="default"
            placeholder="Имя"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </InputWrapper>
        <InputWrapper margin="mb-6">
          <Input
            name="email"
            value={email}
            type="text"
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
          <Button type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </div>
        <FormAdditional
          link="/login"
          text="Уже зарегистрированы?"
          linkLabel="Войти"
          margin="mb-4"
        />
      </Form>
    </main>
  );
};
