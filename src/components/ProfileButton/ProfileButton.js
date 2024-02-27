import React from "react";
import "./ProfileButton.css";

function ProfileButton({ name }) {
  const directProfile = () => {
    window.open("https://www.linkedin.com/in/benyoon1/", "_blank");
  };

  return (
    <button className="profile-button" onClick={directProfile}>
      {name}
    </button>
  );
}

export default ProfileButton;
