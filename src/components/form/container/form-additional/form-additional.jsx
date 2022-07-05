import { Link } from 'react-router-dom';
import styles from './form-additional.module.css';


const FormPrompt = ({ link, text, linkLabel, margin }) => {
  return (
    <p className={`${styles.text} ${margin} text text_type_main-default text_color_inactive`}>
      {text}
      <Link to={link} className={`${styles.link} text text_type_main-default`}>
        {linkLabel}
      </Link>
    </p>
  );
};

export default FormPrompt;