import React from "react";
import { IoVolumeMediumSharp, IoVolumeMuteSharp } from "react-icons/io5";
import "./PlayButton.css";

const SoundButton = ({ isVolumeMuted, onVolumeClick }) => {
  return (
    <button className="sound-button" onClick={onVolumeClick}>
      {isVolumeMuted ? (
        <IoVolumeMuteSharp className={"media-button"} />
      ) : (
        <IoVolumeMediumSharp className={"media-button"} />
      )}
    </button>
  );
};

export default SoundButton;
