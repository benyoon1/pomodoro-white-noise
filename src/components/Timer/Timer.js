import React from "react";
import "./Timer.css";

function Timer({ minutes, seconds }) {
  const time = minutes + ":" + (seconds < 10 ? `0${seconds}` : seconds);

  return (
    <div>
      <div className="timer">{time}</div>
    </div>
  );
}

export default Timer;
