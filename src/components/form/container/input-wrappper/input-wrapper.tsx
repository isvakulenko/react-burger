import { FC } from "react";
import styles from "./input-wrapper.module.css";

type TInputWrapperProps = {
  margin: string;
};

const InputWrapper: FC<TInputWrapperProps> = ({ children, margin }) => {
  return <div className={`${styles.wrap} ${margin}`}>{children}</div>;
};

export default InputWrapper;
