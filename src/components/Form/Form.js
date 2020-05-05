import React, { useState } from "react";
import "./Form.scss";

const Form = props => {
  const { callback } = props;
  const [inputValue, setInputValue] = useState("");

  const onZapisz = () => {
    callback(inputValue);
  };

  return (
    <div className="Form">
      <div className="popup">
        <input
          className="input"
          placeholder="Podaj swój nick..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        ></input>
        <button className="btn" onClick={onZapisz}>
          Zapisz
        </button>
      </div>
    </div>
  );
};

export default Form;
