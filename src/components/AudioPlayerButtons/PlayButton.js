import React from "react";
import { IoPlay } from "react-icons/io5";
import "./PlayButton.css";

function PlayButton({ onRestartClick }) {
  return (
    <button class="play-button" onClick={onRestartClick}>
      <IoPlay />
    </button>
  );
}

export default PlayButton;
