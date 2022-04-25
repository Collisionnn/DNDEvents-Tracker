import React from "react";
import styles from "./MainTableItem.module.css";
import Card from "../UI/Card";
import bin from "../UI/assets/delete.png";

//riporto da round a giorni ore minuti round
const fromRoundsToTime = (re) => {
  let days = 0;
  let hours = 0;
  let minutes = 0;
  let rounds = 0;

  if (re >= 14400) {
    while (re > 0 && re >= 14400) {
      days = days + 1;
      re = re - 14400;
    }
  }
  if (re >= 600 && re < 14400) {
    while (re > 0 && re >= 600) {
      hours = hours + 1;
      re = re - 600;
    }
  }
  if (re >= 10 && re < 600) {
    while (re > 0 && re >= 10) {
      minutes = minutes + 1;
      re = re - 10;
    }
  }
  if (re >= 1 && re < 10) {
    while (re > 0 && re >= 1) {
      rounds = rounds + 1;
      re = re - 1;
    }
  }

  return [days, hours, minutes, rounds];
};

const MainTableItem = (props) => {
  let tD = props.totalDuration;
  let days = 0;
  let hours = 0;
  let minutes = 0;
  let rounds = 0;

  const spell = props.spell;

  //in base al valore della totalDuration setto il colore del font
  // CHECK non faccio una funzione a parte perchè devo settare tD = 0 quando è <=0 e lo dovrei tornare
  if (tD <= 0) {
    tD = 0;
    // setTD(0);
  }

  let colorFont = styles.tableItem;

  if (tD === 0) {
    colorFont = styles.red;
    //se l'utente inserisce uno da input e non ci arriva tramite sottrazione, quell'1 è una stringa
  } else if (+tD === 1) {
    colorFont = styles.yellow;
  } else {
    colorFont = styles.tableItem;
  }

  const deleteHandler = () => {
    props.deleteF(tD, props.id);
  };

  //riporto da round a giorni ore minuti round
  [days, hours, minutes, rounds] = fromRoundsToTime(+props.totalDuration);
  return (
    <li>
      <Card className={`${styles.tableItem} ${colorFont}`}>
        <img onClick={deleteHandler} src={bin} alt="delete icon" />
        <div className={styles.title}>
          <p>{spell}</p>
        </div>

        <div className={styles.duration}>
          <p>{`${tD}  Rounds Left`}</p>
          <div className={styles.conversion}>
            <span>{`${days} Days`}</span>
            <span>{`${hours} Hours`}</span>
            <span>{`${minutes} Minutes`}</span>
            <span>{`${rounds} Rounds`}</span>
          </div>
        </div>
      </Card>
    </li>
  );
};

export default MainTableItem;
