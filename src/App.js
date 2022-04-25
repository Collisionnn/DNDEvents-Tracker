import React, { useState } from "react";
import InputForm from "./components/inputs/InputForm";
import MainTable from "./components/tables/MainTable";
let id = 0;
function App() {
  //array che contiene i valori submittai dal mainform
  // const eventsTEST = [
  //   { eventId: "1", spell: "Burn Damage", totalDuration: "0" },
  //   { eventId: "2", spell: "Sleep", totalDuration: "1" },
  //   { eventId: "3", spell: "World Will Explode", totalDuration: "2" },
  //   { eventId: "11", spell: "Burn Damage", totalDuration: "3" },
  //   { eventId: "21", spell: "Sleep", totalDuration: "13" },
  //   { eventId: "31", spell: "World Will Explode", totalDuration: "23" },
  //   { eventId: "12", spell: "Burn Damage", totalDuration: "40" },
  //   { eventId: "22", spell: "Sleep", totalDuration: "41" },
  //   { eventId: "32", spell: "World Will Explode", totalDuration: "42" },
  // ];

  const [events, setEvents] = useState([]);

  //funzione per confrontare due oggetti nell'array BUG a volte non ordinava
  // function compare(a, b) {
  //   if (a.totalDuration < b.totalDuration) {
  //     return -1;
  //   }
  //   if (a.totalDuration > b.totalDuration) {
  //     return 1;
  //   }
  //   return 0;
  // }

  //funzione passata a MainForm per ricevere i valori generati da quel form
  const acceptSubmittedForm = (spell, totalDuration) => {
    const event = {
      eventId: "",
      spell: "",
      totalDuration: "",
    };
    id = id + 1;
    event.eventId = id;
    event.spell = spell;
    event.totalDuration = totalDuration;
    setEvents((prevExp) => {
      return [event, ...prevExp].sort((a, b) => {
        return a.totalDuration - b.totalDuration;
      });
    });
  };

  //funzione che ad ogni click del bottone next turn diminuisce la total duration di 1
  // degli elemnti nella mainTable
  const nextTurnHandler = () => {
    events.forEach(function (item, index, object) {
      if (item.totalDuration === 0) {
        object.splice(index, 1);
      }
    });
    const eventsNextTurn = events.map((event) => {
      return {
        eventId: event.eventId,
        spell: event.spell,
        totalDuration: event.totalDuration - 1,
      };
    });
    const eventsNotZero = eventsNextTurn.filter((el) => {
      return el.totalDuration >= 0;
    });
    setEvents(eventsNotZero);
  };
  //funzione per gestire il fast forward. Quando submito il FF fa la sottrazione con la durata inserita
  const ffHandler = (subtraction) => {
    //elimino quelli gia a 0 dal turno precedente
    const eventsAlreadyZero = events.filter((el) => {
      return el.totalDuration > 0;
    });

    const eventsFF = eventsAlreadyZero.map((event) => {
      return {
        eventId: Math.random(),
        spell: event.spell,
        totalDuration: event.totalDuration - subtraction,
      };
    });
    eventsFF.forEach((el) => {
      if (el.totalDuration <= 0) {
        el.totalDuration = 0;
      }
    });
    const eventsNotZeroFF = eventsFF.filter((el) => {
      return el.totalDuration >= 0;
    });

    setEvents(eventsNotZeroFF);
  };

  //funzione che porta a 0 il singolo elemento
  const ffHandlerOne = (totD, index) => {
    const eventNotZero = events.map((event) => {
      if (event.eventId === index) {
        return {
          eventId: Math.random(),
          spell: event.spell,
          totalDuration: event.totalDuration - totD,
        };
      } else {
        return {
          eventId: Math.random(),
          spell: event.spell,
          totalDuration: event.totalDuration,
        };
      }
    });
    setEvents(
      eventNotZero.sort((a, b) => {
        return a.totalDuration - b.totalDuration;
      })
    );
  };

  //funzione per pulire la tabella
  const clearHandler = () => {
    setEvents([]);
  };

  return (
    <React.Fragment>
      <div className="flex">
        <div className="input-fields">
          <InputForm
            passedValues={acceptSubmittedForm}
            displayEvent="block"
            displaySubmit="block"
            displayFF="none"
            submitFunction="submitForm"
            radioIdDays="input-days"
            radioIdHours="input-hours"
            radioIdMinutes="input-minutes"
            radioIdRounds="input-rounds"
          ></InputForm>

          <button className="btn next" onClick={nextTurnHandler}>
            Next Turn
          </button>
          <InputForm
            passedValues={acceptSubmittedForm}
            displayEvent="none"
            displaySubmit="none"
            displayFF="block"
            onFF={ffHandler}
            submitFunction="submitFF"
            eventsFF={events}
            radioIdDays="ff-days"
            radioIdHours="ff-hours"
            radioIdMinutes="ff-minutes"
            radioIdRounds="ff-rounds"
          ></InputForm>
          <button className="btn clear" onClick={clearHandler}>
            CLEAR
          </button>
        </div>
        <MainTable events={events} deleteFunction={ffHandlerOne}></MainTable>
      </div>
    </React.Fragment>
  );
}

export default App;
