import React from "react";
import { IoReload } from "react-icons/io5";
import "./RestartButton.css";

const RestartButton = ({ onRestartClick }) => {
  return (
    <button className="restart-box" onClick={onRestartClick}>
      <IoReload className={"restart-button"} />
    </button>
  );
};

export default RestartButton;
