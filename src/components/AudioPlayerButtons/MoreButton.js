import React, { useState, useEffect } from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";
import "./PlayButton.css";
import "./MoreButton.css";

function MoreButton({ onAudioSelected }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let timer;
    if (isOpen && !isHovering) {
      timer = setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isOpen, isHovering]);

  return (
    <div className="more-button">
      <div className="dropdown">
        <button onClick={toggleDropdown} className="dropbtn">
          <IoEllipsisHorizontal className={"hover-button"} />
        </button>
        <div
          className={`dropdown-content ${isOpen ? "show" : ""}`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div>Audio Tracks</div>
          <button onClick={() => onAudioSelected(0)}>Under Water</button>
          <button onClick={() => onAudioSelected(1)}>Airplane</button>
          <button onClick={() => onAudioSelected(2)}>Vent</button>
        </div>
      </div>
    </div>
  );
}

export default MoreButton;
