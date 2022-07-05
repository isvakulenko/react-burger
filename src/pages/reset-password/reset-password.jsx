import { useState } from "react";
import { useDispatch } from 'react-redux';
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";
import Form from "../../components/form/form";
import InputWrapper from "../../components/form/container/input-wrappper/input-wrapper";
import FormAdditional from "../../components/form/container/form-additional/form-additional";

export const ResetPasswordPage = () => {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setVisible] = useState(false);
  const dispatch = useDispatch();


  return (
    <main className={styles.main}>
      <Form className={styles.form} title="Восстановление пароля"
      name="reset-password"
      // onSubmit={handleSubmit}
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
