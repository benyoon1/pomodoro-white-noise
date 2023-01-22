import React from "react";
import "./TimerTypeButton.css";

function TimerTypeButton({ name, onTypeClick, highlightedButton }) {
  return (
    <button
      className={highlightedButton ? "button-selected" : "button"}
      onClick={onTypeClick}
    >
      {name}
    </button>
  );
}

export default TimerTypeButton;
