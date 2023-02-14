import React from "react";
import { IoPlaySkipForward } from "react-icons/io5";
import "./NextSongButton.css";

function NextSongButton({ onRestartClick }) {
  return (
    <button class="play-button" onClick={onRestartClick}>
      <IoPlaySkipForward />
    </button>
  );
}

export default NextSongButton;
