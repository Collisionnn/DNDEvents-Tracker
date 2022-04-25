import React from "react";
import styles from "./ErrorModal.module.css";
import Card from "../UI/Card";

const ErrorModal = (props) => {
  return (
    <React.Fragment>
      <div className={styles.backdrop} onClick={props.onConfirm} />

      <Card className={styles.modal}>
        <header className={styles.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={styles.content}>
          <p>{props.message}</p>
        </div>
        <footer className={styles.actions}>
          <button onClick={props.onConfirm}>Okay</button>
        </footer>
      </Card>
    </React.Fragment>
  );
};

export default ErrorModal;
