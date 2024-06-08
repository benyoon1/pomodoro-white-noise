import React from "react";
import "./TimerTypeButton.css";

const TimerTypeButton = ({ name, onTypeClick, index, clickedIndex }) => {
  const isHighlightedButton = index === clickedIndex;
  return (
    <button
      className={isHighlightedButton ? "button-selected" : "button"}
      onClick={onTypeClick}
    >
      {name}
    </button>
  );
};

export default TimerTypeButton;
