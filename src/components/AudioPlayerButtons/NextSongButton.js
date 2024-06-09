import React from "react";
import { IoPlaySkipForward } from "react-icons/io5";
import "./PlayButton.css";

const NextSongButton = ({ onNextClick }) => {
  return (
    <button className="play-button" onClick={onNextClick}>
      <IoPlaySkipForward className={"media-button"} />
    </button>
  );
};

export default NextSongButton;
