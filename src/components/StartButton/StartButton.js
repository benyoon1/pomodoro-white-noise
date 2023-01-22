import React from "react";
import "./StartButton.css";

function StartButton({ name, onStartClick }) {
  return (
    <button className="start-button" onClick={onStartClick}>
      {name}
    </button>
  );
}

export default StartButton;
