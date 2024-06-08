import React from "react";
import { IoReload } from "react-icons/io5";
import "./RestartButton.css";

const RestartButton = ({ onRestartClick }) => {
  return (
    <button className="restart-button" onClick={onRestartClick}>
      <IoReload className={"hover-button"} />
    </button>
  );
};

export default RestartButton;
