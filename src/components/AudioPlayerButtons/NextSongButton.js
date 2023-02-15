import React from "react";
import { IoPlaySkipForward } from "react-icons/io5";
import "./PlayButton.css";

function NextSongButton({ onRestartClick }) {
  return (
    <button class="play-button" onClick={onRestartClick}>
      <IoPlaySkipForward class={"hover-button"} />
    </button>
  );
}

export default NextSongButton;
