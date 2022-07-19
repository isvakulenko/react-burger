import styles from './form.module.css';


const Form = ({ children, title, onSubmit, name }) => {
  return (
    <form onSubmit={onSubmit} className={styles.form} name={name}>
      <h2 className={`${styles.form_header} text text_type_main-medium mb-6`}>{title}</h2>
      {children}
    </form>
  );
};

export default Form;