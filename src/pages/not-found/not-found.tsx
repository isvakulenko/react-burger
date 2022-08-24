import styles from "./not-found.module.css";

export const NotFoundPage = () => {
  return (
    <>
      <h1
            className={`${styles.main} mt-20 mb-20 text text_type_main-large `}
      >
        Ничего не найдено
      </h1>
    </>
  );
};
