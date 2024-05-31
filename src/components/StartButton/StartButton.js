import React from "react";
import "./StartButton.css";

const StartButton = ({ onStartClick, isStartClicked }) => {
  return (
    <button
      className={isStartClicked ? "start-clicked" : "start-button"}
      onClick={onStartClick}
    >
      {isStartClicked ? "Pause" : "Start"}
    </button>
  );
};

export default StartButton;
