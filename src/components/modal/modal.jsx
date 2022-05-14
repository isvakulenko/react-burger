import React from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

// Находим DOM-элемент для отрисовки в нем модальных окон
const modalRoot = document.getElementById("modals");

const Modal = ({ onClose, children }) => {
  //Закрытие по нажатию клавиши Escape
  React.useEffect(() => {
    const onEscKeydown = (e) => {
      e.key === "Escape" && onClose();
    };
    // Устанавливаем слушатель события
    document.addEventListener("keydown", onEscKeydown);
    // Снимаем слушатель события
    return () => {
      document.removeEventListener("keydown", onEscKeydown);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <div className={styles.main}>
        <button className={styles.button} type="button">
          <CloseIcon type="primary" onClick={onClose} />
        </button>
        {/* Вложенное в компонент содержимое */}
        <div className={styles.content}>{children}</div>{" "}
      </div>
      <ModalOverlay onClick={onClose} /> {/* Подложка */}
    </>,
    /* Контейнер под модалки #modals */
    modalRoot,
    {}
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default Modal;
