import React from "react";
import { FC } from "react";
import styles from "./form.module.css";

type TFormProps = {
  title?: string;
  name: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  children?: React.ReactNode;
};

const Form: FC<TFormProps> = ({ children, title, onSubmit, name }) => {
  return (
    <form onSubmit={onSubmit} className={styles.form} name={name}>
      <h2 className={`${styles.form_header} text text_type_main-medium mb-6`}>
        {title}
      </h2>
      {children}
    </form>
  );
};

export default Form;
