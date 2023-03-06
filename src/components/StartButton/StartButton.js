import React from "react";
import "./StartButton.css";

function StartButton({ onStartClick, isStartClicked }) {
  return (
    <button
      className={isStartClicked ? "start-clicked" : "start-button"}
      onClick={onStartClick}
    >
      {isStartClicked ? "Pause" : "Start"}
    </button>
  );
}

export default StartButton;
