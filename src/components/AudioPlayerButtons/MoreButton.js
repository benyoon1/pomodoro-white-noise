import React from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";
import "./PlayButton.css";

function MoreButton({ onRestartClick }) {
  return (
    <button class="play-button" onClick={onRestartClick}>
      <IoEllipsisHorizontal class={"hover-button"} />
    </button>
  );
}

export default MoreButton;
