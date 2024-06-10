import React, { useState, useEffect } from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";
import "./PlayButton.css";

const MoreButton = ({ onAudioSelected, selectedButton, setSelectedButton }) => {
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
          <IoEllipsisHorizontal className={"media-button"} />
        </button>
        <div
          className={`dropdown-content ${isOpen ? "show" : ""}`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div>Audio Tracks</div>
          <button
            className={selectedButton === 0 ? "selected" : ""}
            onClick={() => {
              onAudioSelected(0);
              setSelectedButton(0);
            }}
          >
            Under Water
          </button>
          <button
            className={selectedButton === 1 ? "selected" : ""}
            onClick={() => {
              onAudioSelected(1);
              setSelectedButton(1);
            }}
          >
            Airplane
          </button>
          <button
            className={selectedButton === 2 ? "selected" : ""}
            onClick={() => {
              onAudioSelected(2);
              setSelectedButton(2);
            }}
          >
            Vent
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoreButton;
