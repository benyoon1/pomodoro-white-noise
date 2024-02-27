import React from "react";
import "./ProfileButton.css";
import { ReactComponent as GithubLogo } from "../../assets/github-mark.svg";

function GithubButton() {
  const directProfile = () => {
    window.open("https://github.com/benyoon1/pomodoro-white-noise", "_blank");
  };

  return (
    <button className="github-button" onClick={directProfile}>
      <GithubLogo width="3rem" height="3rem" viewBox="0 0 100 100" />
    </button>
  );
}

export default GithubButton;
