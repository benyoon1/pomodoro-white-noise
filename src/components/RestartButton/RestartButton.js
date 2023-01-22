import React from "react";
import "./RestartButton.css";

function RestartButton({ onRestartClick }) {
  return (
    <button className="material-symbols-outlined" onClick={onRestartClick}>
      refresh
    </button>
  );
}

export default RestartButton;
