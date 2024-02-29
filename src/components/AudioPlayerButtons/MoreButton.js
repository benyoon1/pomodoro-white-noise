import React, { useState, useEffect } from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";
import "./PlayButton.css";
import "./MoreButton.css";

function MoreButton({ onAudioSelected }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    let timer;
    if (isOpen) {
      timer = setTimeout(() => {
        setIsOpen(false);
      }, 5000); // 5000ms = 5s
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isOpen]);

  return (
    <div className="more-button">
      <div className="dropdown">
        <button onClick={toggleDropdown} className="dropbtn">
          <IoEllipsisHorizontal className={"hover-button"} />
        </button>
        <div className={`dropdown-content ${isOpen ? "show" : ""}`}>
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
