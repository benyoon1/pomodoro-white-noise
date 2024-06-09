import React from "react";
import { IoPlay, IoPause } from "react-icons/io5";
import "./PlayButton.css";

const PlayButton = ({ onPlayClick, isPlayClicked }) => {
  return (
    <button className="play-button" onClick={onPlayClick}>
      {isPlayClicked ? (
        <IoPause className={"media-button"} />
      ) : (
        <IoPlay className={"media-button"} />
      )}
    </button>
  );
};

export default PlayButton;
