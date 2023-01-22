import React from "react";
import "./LoginButton.css";

function LoginButton({ name }) {
  const comingSoon = () => {
    alert("Coming Soon!");
    console.log("123");
  };

  return (
    <button className="login-button" onClick={comingSoon}>
      {name}
    </button>
  );
}

export default LoginButton;
