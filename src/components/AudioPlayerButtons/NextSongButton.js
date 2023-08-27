import React from "react";
import { IoPlaySkipForward } from "react-icons/io5";
import "./PlayButton.css";

function NextSongButton({ onNextClick }) {
  return (
    <button className="play-button" onClick={onNextClick}>
      <IoPlaySkipForward className={"hover-button"} />
    </button>
  );
}

export default NextSongButton;
