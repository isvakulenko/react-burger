import { FC  } from "react";
import styles from "./modal-overlay.module.css"

type TModalOverlay = {
  onClick:  () => void
}

const ModalOverlay: FC<TModalOverlay> = ({ onClick }) => {
  // пропс onClick - это колбэк для клика по подложке, который закрывает модальное окно
  return (
    <div className={styles.overlay} onClick={onClick} />
  );
};

export default ModalOverlay