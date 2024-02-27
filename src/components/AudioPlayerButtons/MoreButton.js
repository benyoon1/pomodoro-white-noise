import React from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";
import "./PlayButton.css";

function MoreButton() {
  const onMoreClick = () => {
    alert(
      "This button is to show the list of audio tracks. More features coming soon!"
    );
  };

  return (
    <button className="more-button" onClick={onMoreClick}>
      <IoEllipsisHorizontal className={"hover-button"} />
    </button>
  );
}

export default MoreButton;
