import React from "react";
import { IoPlay, IoPause } from "react-icons/io5";
import "./PlayButton.css";

function PlayButton({ onPlayClick, isPlayClicked }) {
  return (
    <button class="play-button" onClick={onPlayClick}>
      {isPlayClicked ? (
        <IoPause class={"hover-button"} />
      ) : (
        <IoPlay class={"hover-button"} />
      )}
    </button>
  );
}

export default PlayButton;
