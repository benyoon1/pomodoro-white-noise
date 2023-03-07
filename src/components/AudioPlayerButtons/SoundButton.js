import React from "react";
import { IoVolumeMediumSharp } from "react-icons/io5";
import "./PlayButton.css";

function SoundButton({ onRestartClick }) {
  return (
    <button className="play-button" onClick={onRestartClick}>
      <IoVolumeMediumSharp className={"hover-button"} />
    </button>
  );
}

export default SoundButton;
