import React from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";
import "./MoreButton.css";

function SoundButton({ onRestartClick }) {
  return (
    <button className="more-button" onClick={onRestartClick}>
      <IoEllipsisHorizontal className={"hover-button"} />
    </button>
  );
}

export default SoundButton;
