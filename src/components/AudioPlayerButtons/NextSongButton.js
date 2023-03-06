import React from "react";
import { IoPlaySkipForward } from "react-icons/io5";
import "./PlayButton.css";

function NextSongButton({ onRestartClick }) {
  return (
    <button className="play-button" onClick={onRestartClick}>
      <IoPlaySkipForward className={"hover-button"} />
    </button>
  );
}

export default NextSongButton;
