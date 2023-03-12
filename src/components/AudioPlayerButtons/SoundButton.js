import React from "react";
import { IoVolumeMediumSharp } from "react-icons/io5";
import "./PlayButton.css";

function SoundButton({ onVolumeClick }) {
  return (
    <button className="play-button" onClick={onVolumeClick}>
      <IoVolumeMediumSharp className={"hover-button"} />
    </button>
  );
}

export default SoundButton;
