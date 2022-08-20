import { useCallback, useState} from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "../../utils/hooks";
import { updatePassword } from '../../services/actions/user';
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
  const { user, message } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const location = useLocation<{from: string}>();
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(updatePassword(email));
    },
    [dispatch, email]
  );
  if (user) {
    // Если объект state не является undefined, вернём пользователя назад.
   return <Redirect to={location.state?.from || '/'} />
 };
 if (message === 'Reset email sent') {
  return (
    <Redirect
      to={{
        pathname: '/reset-password',
      }}
    />
  );
}

//console.log(email)
  return (
    <main className={styles.main}>
      <Form title="Восстановление пароля" name="forgot-password"
      onSubmit={handleSubmit}
      >
        <InputWrapper margin="mb-6">
          <Input
            name="email"
            type="email"
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
