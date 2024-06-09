import React from "react";
import { IoVolumeMediumSharp, IoVolumeMuteSharp } from "react-icons/io5";
import "./PlayButton.css";

const SoundButton = ({
  isVolumeClicked,
  onVolumeClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <button
      className="sound-button"
      onClick={onVolumeClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isVolumeClicked ? (
        <IoVolumeMuteSharp className={"media-button"} />
      ) : (
        <IoVolumeMediumSharp className={"media-button"} />
      )}
    </button>
  );
};

export default SoundButton;
