import React from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";
import "./PlayButton.css";

function MoreButton() {
  const onMoreClick = () => {
    alert("More button clicked");
  };

  return (
    <button className="more-button" onClick={onMoreClick}>
      <IoEllipsisHorizontal className={"hover-button"} />
    </button>
  );
}

export default MoreButton;
