import React, { useState } from "react";
import "./Form.scss";

const Form = props => {
  const { callback, error } = props;
  const [inputValue, setInputValue] = useState("");

  const onZapisz = () => {
    callback(inputValue);
  };

  const enter = event => {
    if (event.key === "Enter") {
      onZapisz();
    }
  };

  return (
    <div className="Form">
      <div className="popup">
        <input
          className="input"
          placeholder="Podaj swój nick..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={enter}
        ></input>
        <p className={error === true ? `error show` : `error`}>
          Podany nick jest zajęty. Podaj inny nick.
        </p>
        <button className="btn" onClick={onZapisz}>
          Zapisz
        </button>
      </div>
    </div>
  );
};

export default Form;
