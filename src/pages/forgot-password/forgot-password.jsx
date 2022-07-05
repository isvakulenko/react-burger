import { useState } from "react";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot-password.module.css";
import Form from "../../components/form/form";
import InputWrapper from "../../components/form/container/input-wrappper/input-wrapper";
import FormAdditional from "../../components/form/container/form-additional/form-additional";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  return (
    <main className={styles.main}>
      <Form className={styles.form} title="Восстановление пароля" name="forgot-password"
      // onSubmit={handleSubmit}
      >
        <InputWrapper margin="mb-6">
          <Input
            name="email"
            type="text"
            value={email}
            size="default"
            placeholder="Укажите e-mail"
            onChange={(e) => {
              setEmail(e.target.value);
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
            Восстановить
          </Button>
        </div>
        <FormAdditional
          link="/login"
          text="Вспомнили пароль?"
          linkLabel="Войти"
          margin="mb-4"
        />
             </Form>
    </main>
  );
};
