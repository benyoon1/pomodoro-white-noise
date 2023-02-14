import React from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";
import "./MoreButton.css";

function MoreButton({ onRestartClick }) {
  return (
    <button class="play-button" onClick={onRestartClick}>
      <IoEllipsisHorizontal />
    </button>
  );
}

export default MoreButton;
