import { useState } from "react";
import { useDispatch } from 'react-redux';
import {
   Input,
  EditIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import Form from "../../components/form/form";
import InputWrapper from "../../components/form/container/input-wrappper/input-wrapper";
import ProfileMenu from "../../components/profile-menu/profile-menu";


export const ProfilePage = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
<section className={styles.main}>
<aside className={styles.profile_menu}>
<ProfileMenu/>
</aside>
  <section className={styles.profile__data}>
  <Form  name="profile"
  // onSubmit={handleSubmit}
  >
  <InputWrapper margin="mb-6">
      <Input
       name="userName"
       type="text"
       value={userName}
       size="default"
       icon={"EditIcon"}
       placeholder="Имя"
       onChange={(e) => {
         setUserName(e.target.value);
       }}
      />
    </InputWrapper>
    <InputWrapper margin="mb-6">
      <Input
        name="email"
        type="text"
        value={email}
        size="default"
        icon={"EditIcon"}
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
        type={"password"}
        size="default"
        icon={"EditIcon"}
             onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
    </InputWrapper>

  </Form>
</section>
</section>

  )
}