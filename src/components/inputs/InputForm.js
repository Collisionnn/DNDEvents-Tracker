import React, { useState } from "react";
import Card from "../UI/Card";
import styles from "./InputForm.module.css";
import ErrorModal from "../errors/ErrorModal";

//componente per permettere all'utente di compilare un form e farne il submit
const InputForm = (props) => {
  // 3 stati che salvano il bottone cliccato del radio button, il valore inserito in spell
  // e il valore inserito in duration
  const [radioSelectedValue, setRadioSelectedValue] = useState("");
  const [sumbittedSpell, setSubmittedSpell] = useState("");
  const [sumbittedDuration, setSubmittedDuration] = useState("");

  const [error, setError] = useState("");

  //oggetto che salva i volori appena submittati del form
  let submittedValues = {
    spell: "",
    duration: "",
    radio: "",
  };

  //funzione per la conversione di qualsiasi durata in round
  const roundConversion = (radio, duration) => {
    if (radio === "Days") {
      return duration * 14400;
    } else if (radio === "Hours") {
      return duration * 600;
    } else if (radio === "Minutes") {
      return duration * 10;
    } else {
      return duration;
    }
  };

  //funzione che setta la variabile di stato ad ogni click di un radio button
  const radioSelectedValueHandler = (event) => {
    setRadioSelectedValue(event.target.value);
  };

  //funzione che viene invocata al submit del form, riempie l'oggetto e passa i volori ad App.js
  const submitFormsHandler = (event) => {
    // event.preventDefault();
    // if (
    //   sumbittedSpell.trim().length === 0 ||
    //   sumbittedDuration.trim().length === 0
    // ) {
    //   setError({
    //     title: "Invalid input",
    //     message:
    //       "Please enter a valid EVENT and/or DURATION (non-empty values).",
    //   });
    //   if (props.submitFunction === "submitForm") {
    //     submittedValues.spell = sumbittedSpell;
    //     submittedValues.duration = sumbittedDuration;
    //     submittedValues.radio = radioSelectedValue;
    //     props.onFF(roundConversion(submittedValues.radio, sumbittedDuration));
    //     setSubmittedSpell("");
    //     setSubmittedDuration("");
    //   }
    //   if (!radioSelectedValue) {
    //     setError({
    //       title: "Invalid Duration",
    //       message: "Please select a valid duration. (eg. Round)",
    //     });
    //   }
    // }

    event.preventDefault();
    if (props.submitFunction === "submitForm") {
      if (!sumbittedSpell || !sumbittedDuration) {
        setError({
          title: "Invalid input",
          message:
            "Please enter a valid EVENT and/or DURATION (non-empty values).",
        });
        return;
      } else if (!radioSelectedValue) {
        setError({
          title: "Invalid Duration",
          message: "Please select a valid duration. (eg. Round)",
        });
        return;
      }

      submittedValues.spell = sumbittedSpell;
      submittedValues.duration = sumbittedDuration;
      submittedValues.radio = radioSelectedValue;
      props.passedValues(
        submittedValues.spell,
        roundConversion(submittedValues.radio, sumbittedDuration)
      );
      setSubmittedSpell("");
      setSubmittedDuration("");
    } else {
      submittedValues.spell = sumbittedSpell;
      submittedValues.duration = sumbittedDuration;
      submittedValues.radio = radioSelectedValue;
      props.onFF(roundConversion(submittedValues.radio, sumbittedDuration));
      setSubmittedSpell("");
      setSubmittedDuration("");
    }
  };
  //funzione che salva il valore di spell immesso nella variabile di stato
  const submittedSpellHandler = (event) => {
    setSubmittedSpell(event.target.value);
  };

  //funzione che salva il valore di duration immesso nella variabile di stato
  const submittedDurationHandler = (event) => {
    setSubmittedDuration(event.target.value);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={styles.card}>
        <form
          className={styles.form}
          //in base all'utilizzo di MainForm scelgo quale funzione usare
          onSubmit={
            submitFormsHandler
            // props.submitFunction === "submitForm"
            //   ? submitMainFormHandler
            //   : submitFFHandler
          }
        >
          <div className={styles.eventField}>
            <label
              htmlFor="input-spell"
              style={{ display: props.displayEvent }}
            >
              Event
            </label>
            <input
              placeholder="Insert, spell, effect, event..."
              type="text"
              id="input-spell"
              onChange={submittedSpellHandler}
              value={sumbittedSpell}
              style={{ display: props.displayEvent }}
            ></input>
          </div>

          <div className={styles.checkboxes}>
            <input
              type="radio"
              name="input-time"
              value="Days"
              id={props.radioIdDays}
              onClick={radioSelectedValueHandler}
            ></input>
            <label htmlFor={props.radioIdDays}>Days</label>

            <input
              type="radio"
              name="input-time"
              value="Hours"
              id={props.radioIdHours}
              onClick={radioSelectedValueHandler}
            ></input>
            <label htmlFor={props.radioIdHours}>Hours</label>

            <input
              type="radio"
              name="input-time"
              value="Minutes"
              id={props.radioIdMinutes}
              onClick={radioSelectedValueHandler}
            ></input>
            <label htmlFor={props.radioIdMinutes}>Minutes</label>

            <input
              type="radio"
              name="input-time"
              value="Rounds"
              id={props.radioIdRounds}
              onClick={radioSelectedValueHandler}
            ></input>
            <label htmlFor={props.radioIdRounds}>Rounds</label>
          </div>

          <div className={styles.timeField}>
            <label htmlFor="input-duration">
              Duration in <p className={styles.bold}>{radioSelectedValue}</p>
            </label>
            <input
              placeholder="Length of time necessary"
              type="number"
              id="input-duration"
              onChange={submittedDurationHandler}
              value={sumbittedDuration}
              min="1"
            ></input>
          </div>
          <button
            className={styles.button}
            type="submit"
            style={{ display: props.displaySubmit }}
          >
            Submit
          </button>
          <button
            className={styles.button}
            type="submit"
            style={{ display: props.displayFF }}
          >
            Fast Forward
          </button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default InputForm;
