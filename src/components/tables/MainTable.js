import React from "react";
import Card from "../UI/Card";
import MainTableItem from "./MainTableItem";
import styles from "./MainTable.module.css";

const MainTable = (props) => {
  return (
    <Card className={styles.allign}>
      <ul>
        {props.events.map((event) => (
          <MainTableItem
            key={event.eventId}
            id={event.eventId}
            spell={event.spell}
            totalDuration={event.totalDuration}
            deleteF={props.deleteFunction}
          ></MainTableItem>
        ))}
      </ul>
    </Card>
  );
};

export default MainTable;
