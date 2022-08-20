import { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "../../utils/hooks";
import { setUser } from "../../services/actions/user";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import Form from "../../components/form/form";
import InputWrapper from "../../components/form/container/input-wrappper/input-wrapper";
import ProfileMenu from "../../components/profile-menu/profile-menu";

export const ProfilePage = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDataChanged, setIsDataChanged] = useState(false);
  const { user, isUserChanged, message } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      setEmail(user?.email);
      setUserName(user?.name);
    }
  }, [user]);

  // Универсальная функция, проверяющая изменения данных в любом поле формы
  // управляет появлением кнопок Сохранить и Отмена
  const onInputChange = useCallback((e, inputData, setInputData) => {
    const updValue = e.target.value;
    if (updValue === inputData) {
      setIsDataChanged(false);
    } else {
      setIsDataChanged(true);
    }
    setInputData(updValue);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(setUser(email, userName, password));
    },
    [dispatch, userName, email, password]
  );

  const handleCancel = useCallback((e) => {
    e.preventDefault();
    setEmail(user!.email);
    setUserName(user!.name);
  }, []);

  return (
    <section className={styles.main}>
      <aside className={styles.profile_menu}>
        <ProfileMenu />
      </aside>
      <section className={styles.profile__data}>
        <Form name="profile" onSubmit={handleSubmit}>
          <InputWrapper margin="mb-6">
            <Input
              name="userName"
              type="text"
              value={userName}
              size="default"
              icon={"EditIcon"}
              placeholder="Имя"
              onChange={(e) => onInputChange(e, user!.name, setUserName)}
            />
          </InputWrapper>
          <InputWrapper margin="mb-6">
            <Input
              name="email"
              type="email"
              value={email}
              size="default"
              icon={"EditIcon"}
              placeholder="E-mail"
              onChange={(e) => onInputChange(e, user!.email, setEmail)}
            />
          </InputWrapper>
          <InputWrapper margin="mb-6">
            <Input
              name="password"
              placeholder="Пароль"
              value={password}
              type={"password"}
              size="default"
              icon={"EditIcon"}
              onChange={(e) => onInputChange(e, password, setPassword)}
            />
          </InputWrapper>
          {/* Кнопки Отмена и Сохранить появятся только если пользователь изменил данные в форме */}
          {isDataChanged && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button onClick={handleCancel} size="medium" type="secondary">
                Отмена
              </Button>
              <Button size="medium" type="primary" name="profile">
                Сохранить
              </Button>
            </div>
          )}
          {message && (
            <p className="text text_type_main-small">
              Ошибка обновления {message}
            </p>
          )}
          {isUserChanged && (
            <p className="text text_type_main-small">Данные обновлены. </p>
          )}
        </Form>
      </section>
    </section>
  );
};
