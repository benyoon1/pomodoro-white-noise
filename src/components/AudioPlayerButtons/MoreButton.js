import React from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";
import "./PlayButton.css";

function MoreButton({ onRestartClick }) {
  return (
    <button className="play-button" onClick={onRestartClick}>
      <IoEllipsisHorizontal className={"hover-button"} />
    </button>
  );
}

export default MoreButton;
