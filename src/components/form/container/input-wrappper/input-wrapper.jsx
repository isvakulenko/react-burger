
import styles from './input-wrapper.module.css';


const InputWrapper = ({ children, margin }) => {
  return <div className={`${styles.wrap} ${margin}`}>{children}</div>;
};

export default InputWrapper;