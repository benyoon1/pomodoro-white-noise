import React from "react";
import { IoPlay, IoPause } from "react-icons/io5";
import "./PlayButton.css";

function PlayButton({ onPlayClick, isPlayClicked }) {
  // onPlayClick = (e) => {
  //   console.log(e);
  // };
  return (
    <button className="play-button" onClick={onPlayClick}>
      {isPlayClicked ? (
        <IoPause className={"hover-button"} />
      ) : (
        <IoPlay className={"hover-button"} />
      )}
    </button>
  );
}

export default PlayButton;
